import { RequestStatus } from "@prisma/client";
import { IsEnum, IsMongoId, IsNotEmpty } from "class-validator";

export class UpdateLeaveRequestDto {
    @IsNotEmpty({message:"Id can't be empty"})
    @IsMongoId({message:"Id is not correct"})
    id: string

    @IsNotEmpty({message:"requestStatus can't be empty"})
    @IsEnum(RequestStatus, {
        message: `requestStatus must be one of: ${Object.values(RequestStatus).join(', ')}`,
    })
    request_status: RequestStatus

}