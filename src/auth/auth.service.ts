import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// import {} from "src/bcrypt/index"
import { CreateUserDto } from 'src/user/dto/register-user.dto';
import { UserUpdateService } from 'src/user/server/main/user-update.service';
import { UserFindService } from 'src/user/server/main/user-find.service';
import { compareBcrypt, hashBcrypt } from 'src/bcrypt/index';
import { AuthorizationUserDto } from 'src/user/dto/user-authorization.dto';
// import { Users } from 'src/user/users.entity';
// import { UserProfile } from 'src/user/interface/user-profie.intefrace';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userUpdateService: UserUpdateService,
    private readonly userFindService: UserFindService,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const userSet: CreateUserDto = {
      email: createUserDto.email,
      login: createUserDto.login,
      name: createUserDto.name,
      password: hashBcrypt(createUserDto.password),
      patronymic: createUserDto.patronymic,
      surname: createUserDto.surname,
      avatar: createUserDto.avatar,
    };
    await this.userUpdateService.createUser(userSet);
    return { statusCode: 201, message: 'Вы успешно зарегистрировались' };
  }
  async authorization(authorizationUserDto: AuthorizationUserDto) {
    const user = await this.userFindService.findUserEmailOrLogin(
      authorizationUserDto.login,
      authorizationUserDto.login,
    );
    if (user && compareBcrypt(authorizationUserDto.password, user.password)) {
      const payload = {
        email: user.email,
        id: user.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new HttpException(
        'Не верно указан логин или пароль',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
