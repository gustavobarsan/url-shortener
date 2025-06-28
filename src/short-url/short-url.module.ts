import { Module } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { ShortUrlController } from './short-url.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ShortUrlService],
  controllers: [ShortUrlController, PrismaService, ConfigService]
})
export class ShortUrlModule {}
