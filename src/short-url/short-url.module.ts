import { Module } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { ShortUrlController } from './short-url.controller';

@Module({
  providers: [ShortUrlService],
  controllers: [ShortUrlController]
})
export class ShortUrlModule {}
