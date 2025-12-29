import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { UsersModule } from '../users.module';
import { PublicHolidaysModule } from 'src/public-holidays/public-holidays.module';
import { LeaveEntitlementsModule } from 'src/leaves/leave-entitlements/leave-entitlements.module';
import { LeaveTypeModule } from 'src/leaves/leave-type/leave-type.module';
import { LeaveRequestsModule } from 'src/leaves/leave-requests/leave-requests.module';

@Module({
  imports:[AttendanceModule,UsersModule,PublicHolidaysModule,LeaveEntitlementsModule,LeaveRequestsModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
