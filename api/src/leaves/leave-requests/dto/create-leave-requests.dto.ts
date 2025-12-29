import { RequestStatus } from "@prisma/client"
import { Type } from "class-transformer"
import { IsDateString, IsEnum, IsISO8601, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsPostalCode, IsString} from "class-validator"

export class CreateLeaveRequestDto {

    @IsNotEmpty()
    @IsMongoId()
    userId: string

    @IsNotEmpty()
    @IsMongoId()
    leave_entitlements_id: string

    // @IsNumber()
    // @IsPositive()
    // leaveDays:number
    
    @IsNotEmpty()
    // @IsISO8601()
    @Type(()=> Date)
    from:Date

    @IsNotEmpty()
    // @IsISO8601()
    @Type(()=> Date)
    to:Date

    @IsString()
    @IsNotEmpty()
    reason:string
    // @IsEnum(RequestStatus)
    // request_status: RequestStatus


}