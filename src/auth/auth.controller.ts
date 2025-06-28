import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { AuthGuard } from '@nestjs/passport';
  import { AuthUserDto } from './dto/auth-user.dto';
  import { CreateUserDto } from 'src/users/dto/create-user.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
    }
  
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('local'))
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
  }