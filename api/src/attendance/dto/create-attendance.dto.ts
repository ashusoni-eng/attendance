import { Optional } from "@nestjs/common"
import { IsNumberString, IsString, isString } from "class-validator"
import { coordinates } from "src/types/common"

export class CreateAttendanceDto {
    @IsString()
    userId:string
    @IsString()
    longitude:string
    @IsString()
    latitude:string
}
