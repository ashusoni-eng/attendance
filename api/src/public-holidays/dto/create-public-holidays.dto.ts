import { Transform, Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreatePublicHolidaysDto{
    @IsNotEmpty()
    @IsString()
    @Length(1,50)
    name:string

    @IsString()
    @Length(0,200)
    @IsOptional()
    description:string

    @IsDate()
    @Type(()=>Date)
    date:Date

}   