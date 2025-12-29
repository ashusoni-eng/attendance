import { Module } from "@nestjs/common";
import { LeaveEntitlementsModule } from "../leave-entitlements/leave-entitlements.module";
import { LeaveRequestService } from "./leave-requests.service";
import { PublicHolidaysModule } from "src/public-holidays/public-holidays.module";

@Module({
    imports:[LeaveEntitlementsModule,PublicHolidaysModule],
    controllers:[],
    providers:[LeaveRequestService],
    exports:[LeaveRequestService]
})
export class LeaveRequestsModule{


}