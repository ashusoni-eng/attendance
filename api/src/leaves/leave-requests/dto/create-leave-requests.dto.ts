import { RequestStatus } from "@prisma/client"
import { Type } from "class-transformer"
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsPostalCode, IsString} from "class-validator"

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
    
    @IsDateString()
    @Type(()=> Date)
    from:Date

    @IsDateString()
    @Type(()=> Date)
    to:Date

    @IsString()
    @IsNotEmpty()
    reason:string
    // @IsEnum(RequestStatus)
    // request_status: RequestStatus


}