import { IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShortUrlDto {
  @ApiProperty({
    description: 'A URL original a ser encurtada',
    example: 'https://www.google.com',
  })
  @IsUrl()
  @IsNotEmpty()
  originalUrl: string;
}