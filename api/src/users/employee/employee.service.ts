import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AttendanceService } from 'src/attendance/attendance.service';
import { CreateAttendanceDto } from 'src/attendance/dto/create-attendance.dto';

@Injectable()
export class EmployeeService {
  constructor(private attendanceService:AttendanceService){}
  create(createAttendanceDto: CreateAttendanceDto,imageFile: Express.Multer.File) {
    return this.attendanceService.create(createAttendanceDto,imageFile)
  }

  async findAll(id:string,page:number,perPage:number,from :string|undefined,to:string|undefined) {
    return this.attendanceService.findById(id,page,perPage,from,to);
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
