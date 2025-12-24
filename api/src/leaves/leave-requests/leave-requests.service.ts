import { BadRequestException, Injectable, InternalServerErrorException, UnprocessableEntityException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLeaveRequestDto } from "./dto/create-leave-requests.dto";
import { LeaveEntitlementService } from "../leave-entitlements/leave-entitlements.service";
import { UpdateLeaveRequestDto } from "./dto/update-leave-requests.dto";
import { RequestStatus } from "@prisma/client";

@Injectable()
export class LeaveRequestService {
    constructor(private readonly prismaService: PrismaService, private leaveEntitlementService: LeaveEntitlementService) { }
    async create(createLeaveRequest: CreateLeaveRequestDto) {
        try {
            if (!createLeaveRequest.leaveDays || createLeaveRequest.leaveDays < 1) {
                throw new BadRequestException('leaveDays must be at least 1');
            }
            
            // previous date nhi honi chiye
            // holidays and week off  remove from total leaves

            // check entitlement exists
            const isPresent = await this.leaveEntitlementService.findOne(createLeaveRequest.leave_entitlements_id);
            if (!isPresent) {
                throw new BadRequestException("This leave type is not assigned to you");
            }
            // check balance 
            if (isPresent.remaining_leaves < createLeaveRequest.leaveDays) {
                throw new UnprocessableEntityException('Insufficient Leave balance');
            }

            // perform both entitlement update and request creation in a transaction
            const result = await this.prismaService.$transaction(async (tx) => {
                const updatedEnt = await tx.leave_entitlements.update({
                    where: { id: createLeaveRequest.leave_entitlements_id },
                    data: {
                        under_process: { increment: createLeaveRequest.leaveDays },
                        remaining_leaves: { decrement: createLeaveRequest.leaveDays },
                    },
                });

                const leave_request = await tx.leave_requests.create({
                    data: {
                        userId: createLeaveRequest.userId,
                        leave_entitlements_id: createLeaveRequest.leave_entitlements_id,
                    },
                });

                return { updatedEnt, leave_request };
            });

            return { message: "Request made. Wait for approval", data: result.leave_request };
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof UnprocessableEntityException) throw error;
            throw new InternalServerErrorException("Failed to create leave request. Please try again later.");
        }
    }
    //add user,date and request_status 
    async findAllByAdmin() {
        try {
            const pendingRequest = await this.prismaService.leave_requests.findMany({
                where: { request_status: "PENDING" }
            })
            return pendingRequest;
        }
        catch (e: any) {
            throw new InternalServerErrorException("Try one more time or connect Aeologic support team")
        }
    }
    //add date, request_status filter
    async findAllByEmployee(userId: string) {
        try {
            const pendingLeaveRequest = await this.prismaService.leave_requests.findMany({
                where: { userId, request_status: "PENDING" }
            })
            return pendingLeaveRequest;
        }
        catch (e: any) {
            throw new InternalServerErrorException("Try one more time or connect Aeologic support team")
        }
    }
    async findOne() {
        
    }
    async updateByAdmin(updateLeaveRequestDto: UpdateLeaveRequestDto) {
        try {
            const result = await this.prismaService.$transaction(async (tx) => {
                const leaveRequest = await tx.leave_requests.findUnique({
                    where: { id: updateLeaveRequestDto.id },
                    include: { leave_entitlements: true },
                });

                if (!leaveRequest) {
                    throw new BadRequestException("Id is not correct");
                }

                const underProcessValue: number = Number(
                    leaveRequest.leave_entitlements?.under_process ?? 0,
                );
                const leaveEntitlementsId = leaveRequest.leave_entitlements.id;

                if (updateLeaveRequestDto.request_status === RequestStatus.APPROVED) {
                    await tx.leave_entitlements.update({
                        where: { id: leaveEntitlementsId },
                        data: {
                            under_process: 0,
                            used_leaves: { increment: underProcessValue },
                        },
                    });
                } else if (updateLeaveRequestDto.request_status === RequestStatus.REJECTED) {
                    await tx.leave_entitlements.update({
                        where: { id: leaveEntitlementsId },
                        data: {
                            under_process: 0,
                            remaining_leaves: { increment: underProcessValue },
                        },
                    });
                }

                const updatedRequest = await tx.leave_requests.update({
                    where: { id: updateLeaveRequestDto.id },
                    data: { request_status: updateLeaveRequestDto.request_status },
                });

                return updatedRequest;
            });

            return { message: "Leave request updated successfully", data: result };
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException(
                "Failed to update leave request. Please try again later.",
            );
        }
    }
}