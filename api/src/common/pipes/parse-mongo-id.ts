import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!/^[0-9a-fA-F]{24}$/.test(value)) {
      throw new BadRequestException('Invalid ID');

    }
    return value;
  }
}
