import { BadRequestException, Injectable, InternalServerErrorException, UnprocessableEntityException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLeaveRequestDto } from "./dto/create-leave-requests.dto";
import { LeaveEntitlementService } from "../leave-entitlements/leave-entitlements.service";
import { UpdateLeaveRequestDto } from "./dto/update-leave-requests.dto";
import { RequestStatus } from "@prisma/client";
import { findNoOfWeekendsDays, TfindNoOfWeekendsDays } from "src/common/lib/dateutil";
import { PublicHolidaysService } from "src/public-holidays/public-holidays.service";
import { formatPaginatedResponse, getPaginationOptions } from "src/common/lib/pagination-helper";

@Injectable()
export class LeaveRequestService {
    constructor(private readonly prismaService: PrismaService, private leaveEntitlementService: LeaveEntitlementService, private publicHolidaysService: PublicHolidaysService) { }
    async create(createLeaveRequest: CreateLeaveRequestDto) {
        try {
            if (!createLeaveRequest.from || !createLeaveRequest.to || createLeaveRequest.from.getTime() > createLeaveRequest.to.getTime()) {
                // previous date nhi honi chiye
                throw new BadRequestException('Date not selected or from Date is greater than to Date');
            }

            createLeaveRequest.from.setUTCHours(0,0,0,0)
            createLeaveRequest.to.setUTCHours(0,0,0,0)
            // --------------------------------------------------------------
            // check apply leave date range should not lies btw already requested leaves
            // OR
            // per day one time leave apply
            // --------------------------------------------------------------
            const WeekendDate = findNoOfWeekendsDays(createLeaveRequest.from, createLeaveRequest.to);
            const noOfHolidays = await this.publicHolidaysService.totalHolidays(createLeaveRequest.from, createLeaveRequest.to);
            const weekDaysDuringHolidays = TfindNoOfWeekendsDays(noOfHolidays);
            // holidays and week off  remove from total leaves
            const leaveDays = WeekendDate + noOfHolidays.length - weekDaysDuringHolidays;


            // check entitlement exists
            const isPresent = await this.leaveEntitlementService.findOne(createLeaveRequest.leave_entitlements_id);
            if (!isPresent) {
                throw new BadRequestException("This leave type is not assigned to you");
            }
            // check balance and leaveDays reflects days excluding holidays and weekend days                                                                                                                                                                                                                                                                                        
            if (isPresent.remaining_leaves < leaveDays) {
                throw new UnprocessableEntityException('Insufficient Leave balance');
            }

            // perform both entitlement update and request creation in a transaction
            const result = await this.prismaService.$transaction(async (tx) => {
                const updatedEnt = await tx.leave_entitlements.update({
                    where: { id: createLeaveRequest.leave_entitlements_id },
                    data: {
                        under_process: { increment: leaveDays },
                        remaining_leaves: { decrement: leaveDays },
                    },
                });

                const leave_request = await tx.leave_requests.create({
                    data: {
                        userId: createLeaveRequest.userId,
                        leave_entitlements_id: createLeaveRequest.leave_entitlements_id,
                        from: createLeaveRequest.from,
                        to: createLeaveRequest.to,
                        reason:createLeaveRequest.reason
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
    async findAllByAdmin(request_status: RequestStatus|undefined,page:number,perPage:number, from: Date|undefined, to: Date) {
        try {
            const {take,skip}=getPaginationOptions({page,perPage})
            const where: any = {}
            // if (leave_entitlements_id) {
            //     where.AND.push(leave_entitlements_id);
            // }
            if (request_status) {
                where.AND.push(request_status);
            }
            if (to) {
                where.AND.push(to)
            }
            if (from) {
                where.AND.push(from)
            }
            const pendingRequest = await this.prismaService.leave_requests.findMany({
                where,
                orderBy: { createdAt: 'desc' }
            })
            const total=await this.prismaService.leave_requests.count({where})
            
            return formatPaginatedResponse<any>(pendingRequest,total,page,perPage);
        }
        catch (e: any) {
            throw new InternalServerErrorException("Try one more time or connect Aeologic support team")
        }
    }
    //add date, request_status filter
    async findAllByEmployee(userId: string, request_status: string, page: number, perPage: number, from: Date, to: Date) {
        try {
            const { take, skip } = getPaginationOptions({ page, perPage })
            const where: any = {}
            if (userId) {
                where.AND.push(userId);
            }
            if (request_status) {
                where.AND.push(request_status);
            }
            if (to) {
                where.AND.push(to)
            }
            if (from) {
                where.AND.push(from)
            }
            const pendingLeaveRequest = await this.prismaService.leave_requests.findMany({
                where,
                take,
                skip
            })
            const total = await this.prismaService.leave_requests.count({ where });
            return formatPaginatedResponse<any>(pendingLeaveRequest, total, page, perPage);
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