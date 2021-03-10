import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/register-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthorizationUserDto } from 'src/user/dto/user-authorization.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  @ApiResponse({
    status: 200,
    type: String,
    description: 'Гость зарегистрироваться',
  })
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }
  @Post('/authorization')
  @ApiResponse({
    status: 200,
    type: String,
    description: 'Гость проходит авторизацию',
  })
  async authorization(
    @Body(ValidationPipe) authorizationUserDto: AuthorizationUserDto,
  ) {
    return await this.authService.authorization(authorizationUserDto);
  }
}
