import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateLeaveEntitlementDto } from "./dto/create-leave-entitlements.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LeaveEntitlementService {
    constructor(private prismaService: PrismaService) { }
    async create(leaveEntitlementDto: CreateLeaveEntitlementDto) {
        try {
            if (!leaveEntitlementDto || !leaveEntitlementDto.leave_type_id) {
                throw new BadRequestException("Leave Details Incomplete")
            }
            const data = await this.prismaService.leave_entitlements.create({ data: { ...leaveEntitlementDto } })
            return data
        }
        catch (e: any) {
            throw new InternalServerErrorException("Leave Not Assigned To User. Contact Aeologic Team")
        }
    }
}