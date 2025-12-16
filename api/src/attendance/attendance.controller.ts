import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() createAttendanceDto: CreateAttendanceDto,
  ) {
    // --add image parameter error not capture
    return this.attendanceService.create(createAttendanceDto, imageFile);
  }

  @Get()
  findAll(
    @Query("page") page: number = 1,
    @Query("perpage") perPage: number = 10,
    @Query("from") from?: string,
    @Query("to") to?: string,
    @Query("q") query?: string | undefined,
  ) {
    return this.attendanceService.findAll(page, perPage, query, from, to);
  }

  @Get(':id')
  findOne(@Param('id') id: string,
    @Query("page") page: number = 1,
    @Query("perpage") perPage: number = 30,
    @Query("from") from?: string,
    @Query("to") to?: string,
  ) {
    return this.attendanceService.findOne(id, page, perPage, from, to);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(+id, updateAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(+id);
  }
}
