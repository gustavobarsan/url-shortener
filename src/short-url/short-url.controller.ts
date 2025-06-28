import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Redirect,
    Req,
    UseGuards,
    Patch,
    Delete,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { ShortUrlService } from './short-url.service';
  import { CreateShortUrlDto } from './dto/create-short-url.dto';
  import { Request } from 'express';
  import { AuthGuard } from '@nestjs/passport';
  import { UpdateShortUrlDto } from './dto/update-short-url.dto';
  import { ConfigService } from '@nestjs/config';
  
  @Controller() 
  export class ShortUrlController {
    constructor(
      private readonly shortUrlService: ShortUrlService,
      private readonly configService: ConfigService,
    ) {}
  
    @Post('shorten')
    @HttpCode(HttpStatus.CREATED)
    async shortenUrl(
      @Body() createShortUrlDto: CreateShortUrlDto,
      @Req() req: Request,
    ) {
      
      const userId = req.user ? (req.user as any).id : undefined;
      const shortUrl = await this.shortUrlService.createShortUrl(
        createShortUrlDto,
        userId,
      );
      const domain = this.configService.get<string>('BASE_URL'); 
      return {
        originalUrl: shortUrl.originalUrl,
        shortenedUrl: `${domain}/${shortUrl.shortCode}`,
      };
    }
  
    @Get(':shortCode')
    @Redirect()
    async redirect(@Param('shortCode') shortCode: string) {
      const shortUrl = await this.shortUrlService.getOriginalUrl(shortCode);
      return { url: shortUrl.originalUrl };
    }
  
    @Get('my-urls')
    @UseGuards(AuthGuard('jwt'))
    async getMyUrls(@Req() req: Request) {
      const userId = (req.user as any).id;
      return this.shortUrlService.getUserShortUrls(userId);
    }
  
    @Patch('my-urls/:id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.OK)
    async updateUrl(
      @Param('id') id: string,
      @Body() updateShortUrlDto: UpdateShortUrlDto,
      @Req() req: Request,
    ) {
      const userId = (req.user as any).id;
      return this.shortUrlService.updateShortUrl(id, updateShortUrlDto, userId);
    }
  
    @Delete('my-urls/:id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUrl(@Param('id') id: string, @Req() req: Request) {
      const userId = (req.user as any).id;
      await this.shortUrlService.softDeleteShortUrl(id, userId);
    }
  }