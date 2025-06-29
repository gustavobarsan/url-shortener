import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {
    @ApiProperty({
        description: 'Email do usuário para autenticação',
        example: 'user@example.com',
      })
      @IsEmail()
      email: string;
    
      @ApiProperty({
        description: 'Senha do usuário (mínimo 6 caracteres)',
        example: 'password123',
        minLength: 6,
      })
      @IsNotEmpty()
      @MinLength(6)
      password: string;
}