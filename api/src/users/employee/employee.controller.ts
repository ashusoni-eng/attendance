import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAttendanceDto } from 'src/attendance/dto/create-attendance.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

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
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
