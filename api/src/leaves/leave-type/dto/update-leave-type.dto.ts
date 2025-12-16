import { LeaveType } from "@prisma/client"
import { IsNotEmpty, isNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class UpdateLeaveTypeDto
{   
    @IsString()
    @IsNotEmpty()
    id:string
    
    @IsString()
    @IsNotEmpty()
    type:string

    @IsOptional()                                                                                                                                                                                                                                                                                                           
    @IsString()
    description:string
    
    @IsOptional()
    @IsNumber()
    @IsPositive()                                                                                           
    max_consecutive_days:number
}