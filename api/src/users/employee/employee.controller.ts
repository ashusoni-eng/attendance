import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, ParseDatePipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAttendanceDto } from 'src/attendance/dto/create-attendance.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateLeaveRequestDto } from 'src/leaves/leave-requests/dto/create-leave-requests.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }
  // -------------employee specific level api--------------------
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.employeeService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
  //--------------employee attendance specific level api------------
  @Post("attendance")
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() createAttendanceDto: CreateAttendanceDto,) {
    return this.employeeService.create(createAttendanceDto, imageFile);
  }

  @Get("attendance/:id")
  findAll(
    @Param("id") id: string,
    @Query("page") page: number = 1,
    @Query("perpage") perPage: number = 31,
    @Query("from") from?: string,
    @Query("to") to?: string
  ) {
    return this.employeeService.findAll(id, page, perPage, from, to);
  }

  //------------employee leaves specific api-----------------------
  @Get("leave/:id")
  // get leave_entitlement of specific user
  findAllLeaves(
    //create a pipe to check wheather id is mongoId or not
    @Param("id") userId: string
  ) {
    return this.employeeService.findAllLeaves(userId);
  }

  @Post("leave/apply-leave")
  async creatLeave(
    @Body() createLeaveRequestDto: CreateLeaveRequestDto
  ) {
    return this.employeeService.createLeave(createLeaveRequestDto)
  }

  @Get("leave/status/:id")
  async getAllLeaveRequestStatus(
    //++add pipe of mongoId to check id params
    @Param("id") employeeId: string,
    //++add another pipe to check requestType should be PENDING , APPROVED, REJECTED
    @Query("requestType") requestStatus: string,
    @Query("page") page: number = 1,
    @Query("from") perPage: number = 30,
    @Query("from", ParseDatePipe) from: Date = new Date(),
    @Query("to", ParseDatePipe) to: Date
  ) {
    if (!to) {
      to = new Date();
      to.setMonth(from.getMonth() + 1);
    }
    return this.employeeService.findAllLeaveRequestById(employeeId, requestStatus, page, perPage, from, to)
  }
  //------------employee Holiday specific api-----------------------
  @Get("holidays")
  async getPublicHolidays(
    @Query("page") page: number = 1,
    @Query("from") perPage: number = 30,
    @Query("from", ParseDatePipe) from: Date = new Date(),
    @Query("to", ParseDatePipe) to: Date
  ) {
    if (!to) {
      to = new Date();
      to.setMonth(from.getMonth() + 1);
    }
    return this.employeeService.findAllHolidays(page, perPage, from, to)
  }
}
