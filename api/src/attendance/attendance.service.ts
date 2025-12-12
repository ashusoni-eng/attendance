import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { AttendanceType } from 'src/types/common';
import { formatPaginatedResponse, getPaginationOptions } from 'src/common/lib/pagination-helper';


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
        new Error("you have not uploaded the image or Connect to the aeologic team")
      }
      const userId: string = createAttendanceDto.userId;
      const userExist = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true } })
      if (userExist) {
        const userEmail = userExist.email
        const date = new Date();
        const DDMMYY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

        const rootPath = process.cwd();
        const userFolder = join(rootPath, "image", DDMMYY);

        // Create folder
        await mkdir(userFolder, { recursive: true });

        // Final path
        const finalPath = join(userFolder, userEmail+'-'+image.originalname);

        console.log("Saving to:", finalPath);

        // Write file
        await writeFile(finalPath, image.buffer);
        
        // save attendence
        const attendence:AttendanceType={
          userId,
          location:{longitude:createAttendanceDto.longitude,
            latitude:createAttendanceDto.longitude
          },
          imagePath:finalPath
        }
        const attendance=await this.prisma.attendence.create({
          data:{...attendence}
        })
        if(attendance){
          return "Attendence Marked Successfully"
        }
        return new Error("Something went wrong")

      }
    }
    catch (error) {
      return new Error("Attendence not register try contacting aeologic team")
    }
  }

  async findAll(page:number,perPage:number,query:string|undefined,from:string|undefined,to:string|undefined) {
    try{
      const { skip, take } = getPaginationOptions({ page, perPage });
      const where:any={}
      if(query){
        where.OR=[{user:{fullname:{contains:query}}},
          {user:{email:{contains:query}}},
          {user:{phone:{contains:query}}}
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
      const items=await this.prisma.attendence.findMany({
        where,
        include:{user:{select:{fullName:true,email:true,phone:true}}},
        skip,
        take,
        orderBy:{createdAt:"desc"}
      })
      return formatPaginatedResponse<any>(items,items.length,page,perPage)
    }
    catch(e:any){
        new Error("")
    }
    
    return `This action returns all attendance`;
  }

  findOne(id: string) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
