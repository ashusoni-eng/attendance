import { Module } from "@nestjs/common";
import { LeaveEntitlementsModule } from "../leave-entitlements/leave-entitlements.module";
import { LeaveRequestService } from "./leave-requests.service";

@Module({
    imports:[LeaveEntitlementsModule],
    controllers:[],
    providers:[LeaveRequestService],
    exports:[LeaveRequestService]
})
export class LeaveRequestsModule{


}