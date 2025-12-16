import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLeaveTypeDto } from "./create-leave-type.dto";
import { UpdateLeaveTypeDto } from "./update-leave-type.dto";

@Injectable()
export class LeaveTypeService {
    constructor(private prismaService: PrismaService) { }
    async create(leaveTypeDto: CreateLeaveTypeDto) {
        try {
            await this.prismaService.leaveType.create({data:{...leaveTypeDto}})
        }
        catch (e: any) {
            return new InternalServerErrorException("Contact to AeoLogic Team")
        }
    }
    // --add pagination in future
    async findAll(){
        try{
            const allLeaveType=await this.prismaService.leaveType.findMany({});
            return allLeaveType;
        }
        catch(e:any){
            return new InternalServerErrorException("Contact Aeologic Team")
        }
    }
    async update(updateLeaveDto:UpdateLeaveTypeDto){
        try{
            await this.prismaService.leaveType.update({where:{id:updateLeaveDto.id},
            data:{
                ...updateLeaveDto
            }})
        }
        catch(e:any){
            return new InternalServerErrorException("Connect Aeologic Team")
        }
    }
}