import { Injectable } from "@nestjs/common";
import { formatPaginatedResponse, getPaginationOptions } from "src/common/lib/pagination-helper";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePublicHolidaysDto } from "./dto/create-public-holidays.dto";

@Injectable()
export class PublicHolidaysService {
    constructor(private readonly prismaService: PrismaService) { }

    async totalHolidays(from: Date, to: Date): Promise<{ date: Date }[]> {
        // from.setHours(0);
        // from.setMinutes(0);
        // from.setSeconds(0);
        // from.setMilliseconds(0);
        // to.setHours(23);
        // to.setMinutes(59);
        // to.setSeconds(59);
        // to.setMilliseconds(59);
        try {
            return await this.prismaService.publicHoliday.findMany({
                where: { AND: [{ date: { gte: from } }, { date: { lte: to } }] },
                select: { date: true }
            })
        }
        catch (e: any) {
            throw new Error("Something went wrong")
        }

    }
    async findAll(page: number, perPage: number, from: Date, to: Date) {
        try {
            const { take, skip } = getPaginationOptions({ page, perPage });
            const where: any = {}
            if (from) {
                where.AND = [];
                where.AND.push({ date: { gte: from } })
            }
            if (to) {
                if (!where.AND) {
                    where.AND = [];
                }
                where.AND.push({ date: { lte: to } })
            }
            const result = await this.prismaService.publicHoliday.findMany({
                where,
                take,
                skip,
                orderBy: { createdAt: "asc" }
            })
            const total = await this.prismaService.publicHoliday.count({ where })
            return formatPaginatedResponse(result, total, page, perPage)
        }
        catch (e: any) {
            throw new Error(e.message)
        }
    }
    async createPublicHolidays(createPublicHolidayDto: CreatePublicHolidaysDto) {
        try {
            type createPublicHolidayType={
                name:string,
                description?:string
                date:Date
            }
            const publicHolidaysData:createPublicHolidayType={
                name:createPublicHolidayDto.name,
                description:createPublicHolidayDto.description,
                date:createPublicHolidayDto.date
            }
            const result =await this.prismaService.publicHoliday.create({
                data: {
                    ...publicHolidaysData
                }
            })
            return result;

        }
        catch (e: any) {
            throw e;
        }

    }


}