import { LeaveType } from "@prisma/client"
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateLeaveTypeDto {

    @IsString()
    @IsNotEmpty()
    type: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber()
    @IsPositive()
    max_consecutive_days: number
}