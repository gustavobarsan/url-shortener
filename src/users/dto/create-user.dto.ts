import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email único do usuário para registro',
    example: 'newuser@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário para registro (mínimo 6 caracteres)',
    example: 'strongpassword',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}