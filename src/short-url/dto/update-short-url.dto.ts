import { PartialType } from '@nestjs/mapped-types';
import { CreateShortUrlDto } from './create-short-url.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class UpdateShortUrlDto extends PartialType(CreateShortUrlDto) {
  @ApiProperty({
    description: 'A URL original a ser encurtada',
    example: 'https://www.google.com',
  })
  @IsUrl()
  @IsNotEmpty()
  originalUrl: string;
}
