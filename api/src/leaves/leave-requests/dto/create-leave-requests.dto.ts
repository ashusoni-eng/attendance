import { RequestStatus } from "@prisma/client"
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsPostalCode} from "class-validator"

export class CreateLeaveRequestDto {

    @IsNotEmpty()
    @IsMongoId()
    userId: string

    @IsNotEmpty()
    @IsMongoId()
    leave_entitlements_id: string

    @IsNumber()
    @IsPositive()
    leaveDays:number


    // @IsEnum(RequestStatus)
    // request_status: RequestStatus


}