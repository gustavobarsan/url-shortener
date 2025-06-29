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
  import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
  
  @ApiTags('short-url')
  @Controller() 
  export class ShortUrlController {
    constructor(
      private readonly shortUrlService: ShortUrlService,
      private readonly configService: ConfigService,
    ) {}
  
    @Post('shorten')
    @ApiOperation({ summary: 'Encurta uma URL original' })
    @ApiBody({ type: CreateShortUrlDto, description: 'Dados da URL original para encurtar' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'URL encurtada com sucesso' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos' })
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
        shortenedUrl: `${domain}/shorten/${shortUrl.shortCode}`,
      };
    }
  
    @Get('shorten/:shortCode')
    @ApiOperation({ summary: 'Redireciona para a URL original a partir de um código curto' })
    @ApiParam({ name: 'shortCode', description: 'O código curto da URL', example: 'xyz123' })
    @ApiResponse({ status: HttpStatus.FOUND, description: 'Redirecionado com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'URL curta não encontrada' })
    @Redirect()
    async redirect(@Param('shortCode') shortCode: string) {
      const shortUrl = await this.shortUrlService.getOriginalUrl(shortCode);
      return { url: shortUrl.originalUrl };
    }
  
    @Get('my-urls')
    @ApiOperation({ summary: 'Obtém todas as URLs curtas criadas pelo usuário logado' })
    @ApiBearerAuth() // Indica que esta rota requer um token JWT
    @ApiResponse({ status: HttpStatus.OK, description: 'Lista de URLs curtas do usuário' })
    @UseGuards(AuthGuard('jwt'))  
    async getMyUrls(@Req() req: Request) {
      const userId = (req.user as any).id;
      return this.shortUrlService.getUserShortUrls(userId);
    }
  
    @Patch('my-urls/:id')
    @ApiOperation({ summary: 'Atualiza uma URL curta existente do usuário' })
    @ApiParam({ name: 'id', description: 'O ID da URL curta a ser atualizada', example: '65e8a5e3a7b7e3f8d2e4c1a0' })
    @ApiBody({ type: UpdateShortUrlDto, description: 'Dados para atualização da URL curta' })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, description: 'URL curta atualizada com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'URL curta não encontrada' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Não autorizado a atualizar esta URL' })
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
    @ApiOperation({ summary: 'Exclui (soft delete) uma URL curta do usuário' })
    @ApiParam({ name: 'id', description: 'O ID da URL curta a ser excluída', example: '65e8a5e3a7b7e3f8d2e4c1a0' })
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'URL curta excluída com sucesso' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'URL curta não encontrada' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Não autorizado a excluir esta URL' })
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUrl(@Param('id') id: string, @Req() req: Request) {
      const userId = (req.user as any).id;
      await this.shortUrlService.softDeleteShortUrl(id, userId);
    }
  }