import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateLeaveEntitlementDto {

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