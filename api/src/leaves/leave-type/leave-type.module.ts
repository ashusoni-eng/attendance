import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { LeaveTypeService } from "./leave-type.service";


Module({
    imports:[],
    controllers:[],
    providers:[LeaveTypeService],
    exports:[LeaveTypeService]
})
export class LeaveTypeModule{

}