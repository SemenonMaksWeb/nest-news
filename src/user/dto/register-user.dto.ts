import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Matches,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail(undefined, { message: 'не коррентно указан емайл' })
  @IsString({ message: 'емайл должен является строкой' })
  @IsNotEmpty({ message: 'емайл обязательное поле' })
  readonly email: string;

  @ApiProperty()
  @IsString({ message: 'пароль должен является строкой' })
  @IsNotEmpty({ message: 'пароль обязательное поле' })
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'слишком легкий пароль' },
  )
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'логин обязательное поле' })
  @MinLength(6, { message: 'логин должен состоять из более 6 сиволов' })
  @MaxLength(20, { message: 'логин должен состоять из менее 20 сиволов' })
  @IsString({ message: 'логин должен является строкой' })
  @Matches(/^[a-zA-Zа0-9]*$/, { message: 'Не валидный логин' })
  readonly login: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Имя обязательное поле' })
  @IsString({ message: 'Имя должно быть строкой' })
  @Matches(/^[a-zA-Zа-яА-яЕЁ]*$/, { message: 'Не валидное имя' })
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'фамилия обязательное поле' })
  @IsString({ message: 'фамилия должна являться строкой' })
  @Matches(/^[a-zA-Zа-яА-яЕЁ]*$/, { message: 'Не валидная фамилия' })
  readonly surname: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'отчество обязательное поле' })
  @IsString({ message: 'отчество должно быть строкой' })
  @Matches(/^[a-zA-Zа-яА-яЕЁ]*$/, { message: 'Не валидное отчество' })
  readonly patronymic: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'изображение аватарки указано не коррентно' })
  readonly avatar?: string;
}
