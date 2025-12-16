import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import * as argon2 from "argon2";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { UserSelect } from "../../selects/user";
import { ProfileUpdateDto } from "src/auth/dto/profileUpdate.dto";
import { handlePrismaError } from "src/common/lib/handlePrismaError";
import { existsSync, unlinkSync } from "fs";
import { ConfigService } from "@nestjs/config";
import {
  formatNoDataResponse,
  formatPaginatedResponse,
  getPaginationOptions,
} from "src/common/lib/pagination-helper";
import { AccountType } from "@prisma/client";
import { AttendanceService } from "src/attendance/attendance.service";

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
    private attendanceService:AttendanceService
  ) { }

  async create(createAdminDto: CreateAdminDto) {
    console.log(createAdminDto)
    createAdminDto.email = createAdminDto.email.toLowerCase();

    if (!createAdminDto.accountType) {
      createAdminDto.accountType = AccountType.USER;
    }

    const emailExists = await this.prisma.user.findUnique({
      select: {
        email: true,
      },
      where: { email: createAdminDto.email },
    });

    if (emailExists) {
      throw new ConflictException("Email already exists");
    }

    const phoneExists = await this.prisma.user.findFirst({
      where: { phone: createAdminDto.phone },
    });

    if (phoneExists) {
      throw new ConflictException("Phone already exists");
    }

    const hashedPassword = await this.generateHash(createAdminDto.password);

    return this.prisma.user.create({
      data: {
        ...createAdminDto,
        password: hashedPassword,
      },
      select: UserSelect,
    });
  }

  

  async findAll(page: number, perPage: number,query:string, from: string|undefined, to: string|undefined) {
    this.attendanceService.findAll(page,perPage,query,from,to)
    // try {
    //   const { skip, take } = getPaginationOptions({ page, perPage });
    //   const where = { AND: [{}] };
    //   if (from) {
    //     where.AND.push({ createdAt: { gte: { from } } })
    //   }
    //   if (to) {
    //     where.AND.push({ createdAt: { lte: { to } } })
    //   }
    //   const [items, total] = await this.prisma.$transaction([
    //     this.prisma.attendence.findMany({
    //       where: {
    //         ...where, user: { accountType: AccountType.USER },
    //       },
    //       skip,
    //       take,
    //       orderBy: { createdAt: "desc" }
    //     }),
    //     this.prisma.user.count({ where: { ...where, accountType: "USER" } }),
    //   ]);

    //   return formatPaginatedResponse(items, total, page, perPage);
    // } catch (error) {
    //   handlePrismaError(error, "Fetching paginated User");
    // }

    // return this.prisma.user.findMany({
    //   select: UserSelect,
    //   where: {
    //     accountType: "USER",
    //   },
    // });
  }



  async findOne(id: string,page:number,perPage:number,from:string|undefined,to:string|undefined) {
    await this.attendanceService.findById(id,page,perPage,from,to)
    // const user = await this.prisma.user.findUnique({
    //   where: { id },
    // });

    // if (!user) {
    //   throw new NotFoundException(`User not found`);
    // }

    // const { password, ...safeUser } = user;

    // return safeUser;
  }

  async findByEmail(email: string) {
    email = email.toLowerCase();
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // async update(id: string, updateAdminDto: UpdateAdminDto) {
  //   await this.findOne(id);

  //   if (updateAdminDto.email) {
  //     const emailExists = await this.prisma.user.findFirst({
  //       where: {
  //         email: updateAdminDto.email,
  //         NOT: { id },
  //       },
  //     });

  //     if (emailExists) {
  //       throw new ConflictException("Email already exists");
  //     }
  //   }

  //   if (updateAdminDto.phone) {
  //     const phoneExists = await this.prisma.user.findFirst({
  //       where: {
  //         phone: updateAdminDto.phone,
  //         NOT: { id },
  //       },
  //     });

  //     if (phoneExists) {
  //       throw new ConflictException("Phone already exists");
  //     }
  //   }

  //   const data: any = { ...updateAdminDto };

  //   if (
  //     typeof updateAdminDto.password === "string" &&
  //     updateAdminDto.password.trim()
  //   ) {
  //     data.password = await this.generateHash(updateAdminDto.password);
  //   } else {
  //     delete data.password;
  //   }

  //   return this.prisma.user.update({
  //     where: { id },
  //     data,
  //     select: UserSelect,
  //   });
  // }

  // async updateEmailVerified(id: string, status: boolean) {
  //   await this.findOne(id);
  //   return this.prisma.user.update({
  //     where: { id },
  //     data: { isEmailVerified: status },
  //     select: UserSelect,
  //   });
  // }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    const hashedRefreshToken = refreshToken
      ? await this.generateHash(refreshToken)
      : null;

    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User not found`);

    //profile pic
    if (user.profilePic) {
      const baseUrl = this.configService.get<string>("APP_BASE_URL");
      const imagePath = user.profilePic.replace(baseUrl + "/", "");
      try {
        unlinkSync(imagePath);
      } catch (err) {
        console.log(err);
      }
    }

    // delete the user
    return this.prisma.user.delete({
      where: { id },
      select: { id: true },
    });
  }

  private async generateHash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verifyPassword(
    hashedPassword: string,
    plainPassword: string
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, plainPassword);
  }

  async updateprofile(
    userId: string,
    profileUpdateDto: ProfileUpdateDto,
  ) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new BadRequestException("User not found");
      }

      const userprofile = this.prisma.user.update({
        where: { id: userId },
        data: profileUpdateDto,
        select: UserSelect,
      });
      return userprofile;
    } catch (error) {
      handlePrismaError(error, "Failed to update profile.");
    }
  }

  // createSocialUser(socialUser: SocialUser) {
  //   return this.prisma.user.create({
  //     data: {
  //       email: socialUser.email,
  //       fullName: socialUser.fullName,
  //       profilePic: socialUser.profilePic,
  //       isEmailVerified: true,
  //     },
  //   });
  // }

  async searchUser(query: string, page: number, perPage: number) {
    if (!query?.trim()) {
      throw new BadRequestException("Search query is required");
    }

    try {
      const { skip, take } = getPaginationOptions({ page, perPage });

      const where: any = {
        fullName: {
          contains: query,
          mode: "insensitive",
        },
        accountType: "USER",
      };

      const [items, total] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          where,
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            isActive: true,
          },
          skip,
          take,
          orderBy: { fullName: "asc" },
        }),
        this.prisma.user.count({ where }),
      ]);

      if (total === 0) {
        return formatNoDataResponse("User Not Found.");
      }

      return formatPaginatedResponse(items, total, page, perPage);
    } catch (error) {
      handlePrismaError(error, "Fetching paginated User");
    }
  }

  async changeStatus(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return await this.prisma.user.update({
        where: { id },
        data: {
          isActive: !user.isActive,
        },
        select: {
          id: true,
          isActive: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to update user status");
    }
  }
}
