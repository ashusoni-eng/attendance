import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  imports:[AuthModule,BlacklistModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
