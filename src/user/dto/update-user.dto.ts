import {
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @MinLength(6, { message: 'login должен состоять из более 6 сиволов' })
  @MaxLength(20, { message: 'login должен состоять из менее 20 сиволов' })
  @IsString({ message: 'login должен является строкой' })
  @Matches(/^[a-zA-Zа0-9]*$/, { message: 'Не валидный login' })
  readonly login: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  @Matches(/^[a-zA-Zа-яА-яЕЁ]*$/, { message: 'Не валидное имя' })
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'фамилия должна являться строкой' })
  @Matches(/^[a-zA-Zа-яА-яЕЁ]*$/, { message: 'Не валидная фамилия' })
  readonly surname: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'отчество должно быть строкой' })
  @Matches(/^[a-zA-Zа-яА-яЕЁ]*$/, { message: 'Не валидное отчество' })
  readonly patronymic: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'изображение аватарки должно быть строкой' })
  readonly avatar: string;
}
