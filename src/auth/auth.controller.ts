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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registra um novo usuário' })
  @ApiBody({ type: CreateUserDto, description: 'Dados para o registro de um novo usuário' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Usuário registrado com sucesso' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados de registro inválidos' })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Autentica um usuário e retorna um token JWT' })
  @ApiBody({ type: AuthUserDto, description: 'Credenciais do usuário para login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Login bem-sucedido' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Credenciais inválidas' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}