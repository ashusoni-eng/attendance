import { Module } from "@nestjs/common";
import { PublicHolidaysService } from "./public-holidays.service";

@Module({
    imports:[],
    controllers:[],
    exports:[PublicHolidaysService],
    providers:[PublicHolidaysService],

})
export class PublicHolidaysModule{

}