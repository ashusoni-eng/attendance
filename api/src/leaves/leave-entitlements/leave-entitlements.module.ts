import { Module } from "@nestjs/common";
import { LeaveEntitlementService } from "./leave-entitlements.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [],
    providers: [LeaveEntitlementService],
    controllers: [],
    exports: [LeaveEntitlementService],
})
export class LeaveEntitlementsModule {

}