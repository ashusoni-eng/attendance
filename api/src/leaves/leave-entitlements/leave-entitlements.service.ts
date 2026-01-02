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
            //++add if leave already assigned update it or reject it 
            const data = await this.prismaService.leave_entitlements.create({ data: { ...leaveEntitlementDto, remaining_leaves: leaveEntitlementDto.total_leaves } })
            return data
        }
        catch (e: any) {
            throw new InternalServerErrorException("Leave Not Assigned To User. Contact Aeologic Team")
        }
    }
    async findOne(leaveEntitlementId: string) {
        try {
            if (!leaveEntitlementId) {
                throw new BadRequestException("--remove Leave Entitlement Id Not Passed --add Leave type not selected")
            }
            const result = await this.prismaService.leave_entitlements.findUnique({
                where: { id: leaveEntitlementId },
                select: { id: true, leave_requests: true, leaveType: { select: { type: true, description: true } }, remaining_leaves: true, total_leaves: true, under_process: true, used_leaves: true, createdAt: true }
            })
            return result
        }
        catch (e: any) {
            throw e;
        }

    }
    async findLeaves(userId: string) {
        try {
            if (!userId) {
                throw new BadRequestException("Must pass user Id")
            }
            return await this.prismaService.leave_entitlements.findMany({
                where: { userId },
                select: { id: true, leave_requests: true, leaveType: { select: { type: true, description: true } }, remaining_leaves: true, total_leaves: true, under_process: true, used_leaves: true, createdAt: true }
            })
        }
        catch (e: any) {
            if (e instanceof BadRequestException) {
                throw e;
            }
            throw new InternalServerErrorException("DB issue")
        }
    }
}