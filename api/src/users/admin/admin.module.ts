import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import { UsersModule } from '../users.module';
import { AttendanceModule } from 'src/attendance/attendance.module';

@Module({
  imports: [BlacklistModule,UsersModule,AttendanceModule],
    providers: [AdminService],
    controllers: [AdminController],
    exports: [AdminService],
})
export class AdminModule {}
