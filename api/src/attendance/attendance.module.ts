import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
<<<<<<< Updated upstream
// import { AttendanceController } from './attendance.controller';
=======
>>>>>>> Stashed changes
import { AuthModule } from 'src/auth/auth.module';
import { BlacklistModule } from 'src/blacklist/blacklist.module';

@Module({
  imports:[AuthModule,BlacklistModule],
<<<<<<< Updated upstream
  // controllers: [AttendanceController],
=======
  controllers: [],
>>>>>>> Stashed changes
  providers: [AttendanceService],
  exports:[AttendanceService]
})
export class AttendanceModule {}
