import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'логин обязательное поле' })
  @IsString({ message: 'логин должен является строкой' })
  readonly login: string;

  @ApiProperty()
  @IsString({ message: 'пароль должен является строкой' })
  @IsNotEmpty({ message: 'пароль обязательное поле' })
  password: string;
}
