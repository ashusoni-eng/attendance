import { IsString } from "class-validator"

export class CreateEmployeeDto {
    @IsString()
    userId: string
    @IsString()
    longitude: string
    @IsString()
    latitude: string
}
