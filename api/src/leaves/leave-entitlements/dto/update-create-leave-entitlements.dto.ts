import { LeaveType } from "@prisma/client"
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, Min, ValidateNested } from "class-validator";
import { CreateLeaveTypeDto } from "../../leave-type/create-leave-type.dto";

export class UpdateLeaveEntitlementDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    leave_type_id: string;

    @IsInt()
    @Min(0)
    total_leaves: number;
}