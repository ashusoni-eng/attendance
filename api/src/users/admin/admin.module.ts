import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import { UsersModule } from '../users.module';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { PublicHolidaysModule } from 'src/public-holidays/public-holidays.module';
import { LeaveEntitlementsModule } from 'src/leaves/leave-entitlements/leave-entitlements.module';
import { LeaveTypeModule } from 'src/leaves/leave-type/leave-type.module';
import { LeaveRequestsModule } from 'src/leaves/leave-requests/leave-requests.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule,ConfigModule,UsersModule,AttendanceModule,PublicHolidaysModule,LeaveEntitlementsModule,LeaveTypeModule,LeaveRequestsModule],
    providers: [AdminService],
    controllers: [AdminController],
    exports: [AdminService],
})
export class AdminModule {}
