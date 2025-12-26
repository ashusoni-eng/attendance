import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AttendanceService } from 'src/attendance/attendance.service';
import { CreateAttendanceDto } from 'src/attendance/dto/create-attendance.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../users.service';
import { PublicHolidaysService } from 'src/public-holidays/public-holidays.service';
import { LeaveTypeService } from 'src/leaves/leave-type/leave-type.service';
import { LeaveEntitlementService } from 'src/leaves/leave-entitlements/leave-entitlements.service';
import { LeaveRequestService } from 'src/leaves/leave-requests/leave-requests.service';
import { CreateLeaveRequestDto } from 'src/leaves/leave-requests/dto/create-leave-requests.dto';

@Injectable()
export class EmployeeService {
  constructor(private attendanceService: AttendanceService, private userService: UsersService,
    private publicHolidayService: PublicHolidaysService,
    private leaveTypeService: LeaveTypeService,
    private leaveEntitlementService: LeaveEntitlementService,
    private leaveRequestService: LeaveRequestService
  ) { }
  create(createAttendanceDto: CreateAttendanceDto, imageFile: Express.Multer.File) {
    return this.attendanceService.create(createAttendanceDto, imageFile)
  }

  async findAll(id: string, page: number, perPage: number, from: string | undefined, to: string | undefined) {
    return this.attendanceService.findById(id, page, perPage, from, to);
  }

  async findAllHolidays(page: number, perPage: number, from: Date, to: Date) {
    return this.publicHolidayService.findAll(page, perPage, from, to)
  }

  async findAllLeaves(employeeId: string) {
    return this.leaveEntitlementService.findLeaves(employeeId)
  }

  async createLeave(createLeaveRequestDto: CreateLeaveRequestDto) {
    return this.leaveRequestService.create(createLeaveRequestDto)
  }
  
  async findAllLeaveRequestById(userId:string,requestStatus:string,page:number,perPage:number,from:Date,to:Date){
    return this.leaveRequestService.findAllByEmployee(userId,requestStatus,page,perPage,from,to)
  }

  findOne(employeeId: string) {
    return this.userService.findOne(employeeId);
  }

  update(employeeId: string, updateUserDto: UpdateUserDto) {
    return this.userService.update(employeeId, updateUserDto);
  }

  remove(employeeId: string) {
    return this.userService.remove(employeeId);
  }
}
