import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { AttendanceType } from 'src/types/common';
import { formatPaginatedResponse, getPaginationOptions } from 'src/common/lib/pagination-helper';
import { saveFile } from 'src/common/lib/fileHandling';
import { AccountType } from '@prisma/client';


@Injectable()
export class AttendanceService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) { }
  async create(createAttendanceDto: CreateAttendanceDto, image: Express.Multer.File) {
    try {
      // extract userID
      if (!createAttendanceDto || !image) {
        new BadRequestException("You have not Uploaded the image file  or userId or location details")
      }
      const userId: string = createAttendanceDto.userId;
      const userExist = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true } })
      if (userExist) {
        const userEmail = userExist.email
        //save Image
        const finalPath = await saveFile(image, userEmail) as string;
        // save attendence
        const attendance: AttendanceType = {
          userId,
          location: {
            longitude: createAttendanceDto.longitude,
            latitude: createAttendanceDto.longitude
          },
          imagePath: finalPath
        }
        // --add check attendance already marked or not wrt 24 hour
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const isAttendanceMarked = await this.prisma.attendence.findFirst({
          where: {
            userId, createdAt: { gte: startOfDay, lte: endOfDay }
          }
        })
        if (isAttendanceMarked) {
          return new BadRequestException("Attendance Already Marked");
        }

        const attendanceCreated = await this.prisma.attendence.create({
          data: { ...attendance, status: "PRESENT" }
        })
        if (!attendance) {
          return new InternalServerErrorException("Try contacting Aeologic team");
        }
        return attendanceCreated;

      }
    }
    catch (e: any) {
      return new Error("Attendence not register try one more time or contact aeologic team")
    }
  }

  //only admin can access this function
  async findAll(page: number, perPage: number, query: string | undefined, from: string | undefined, to: string | undefined) {
    try {
      const { skip, take } = getPaginationOptions({ page, perPage });
      const where: any = {}
      if (query) {
        where.OR = [{ user: { fullname: { contains: query } } },
        { user: { email: { contains: query } } },
        { user: { phone: { contains: query } } }
        ]
      }
      if (from || to) {
        if (!where.AND) {
          where.AND = [];
        }
        // convert from string to date object first and check the is it possible or not if not dont push
        if (from) {
          where.AND.push({
            createdAt: { gte: new Date(from) },
          });
        }

        if (to) {
          const endDate = new Date(to);
          endDate.setDate(endDate.getDate() + 1);
          where.AND.push({
            createdAt: { lte: endDate },
          });
        }
      }
      const items = await this.prisma.attendence.findMany({
        where: { ...where, accountType: AccountType.ADMIN },
        include: { user: { select: { fullName: true, email: true, phone: true } } },
        skip,
        take,
        orderBy: { createdAt: "asc" }
      })
      const total = await this.prisma.attendence.count({ where: { ...where, accountType: AccountType.ADMIN } })
      return formatPaginatedResponse<any>(items, total, page, perPage)
    }
    catch (e: any) {
      new Error("Something went wrong")
    }

  }

  async findOne(id: string, page: number, perPage: number, from: string | undefined, to: string | undefined) {
    try {

      const userExist = await this.prisma.user.findUnique({ where: { id } })
      if (!userExist) {
        new Error("User don't exist")
      }
      const { skip, take } = getPaginationOptions({ page, perPage });
      const where: any = {}
      if (from || to) {
        if (!where.AND) {
          where.AND = [];
        }
        // convert from string to date object first and check the is it possible or not if not dont push
        if (from) {
          where.AND.push({
            createdAt: { gte: new Date(from) },
          });
        }

        if (to) {
          const endDate = new Date(to);
          endDate.setDate(endDate.getDate() + 1);
          where.AND.push({
            createdAt: { lte: endDate },
          });
        }
      }
      const items = await this.prisma.attendence.findMany({
        where,
        include: { user: { select: { fullName: true, email: true, phone: true } } },
        skip,
        take,
        orderBy: { createdAt: "asc" }
      })
      const total = await this.prisma.attendence.count({ where: { id } })
      return formatPaginatedResponse<any>(items, total, page, perPage)
    }
    catch (e: any) {
      new Error("Something Went Wrong")
    }
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
  async findById(id: string, page: number, perPage: number, from: string | undefined, to: string | undefined,) {
    if (!id) {
      throw new BadRequestException("Id has not passed")
    }
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new BadRequestException("Wrong Id passed");
    }
    const where: any = { AND: [] }
    const { take, skip } = getPaginationOptions({ page, perPage })
    if (from) {
      where.AND.push({ createdAt: { gte: from } })
    }
    if (to) {
      where.AND.push({ createdAt: { lte: to } })
    }
    where.AND.push({ userId: id })
    try {
      const usersData = await this.prisma.attendence.findMany(
        {
          where,
          take,
          skip,
          orderBy: { createdAt: "asc" }
        }
      )
      const total = await this.prisma.attendence.count({ where: { id } })
      // if usersDate is undefined no data exist
      return formatPaginatedResponse(usersData, total, page, perPage)
    }
    catch (e: any) {
      throw new InternalServerErrorException("Contact Aeologic Team --remove findMany function error")
    }
  }
}


