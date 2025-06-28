import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class AuthUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}