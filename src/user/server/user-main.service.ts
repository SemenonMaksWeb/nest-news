import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '../users.entity';
import { UserFindService } from './user-find.service';
import { UserUpdateService } from './user-update.service';
import { UserProfile } from '../interface/user-profie.intefrace';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserMainService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly userFindService: UserFindService,
    private readonly userUpdateService: UserUpdateService,
  ) {}
  async getProfile(user): Promise<UserProfile> {
    return {
      id: user.id,
      avatar: user.avatar,
      email: user.email,
      login: user.login,
      name: user.name,
      patronymic: user.patronymic,
      surname: user.surname,
    };
  }
  async updateProfile(id, updateUserDto: UpdateUserDto){
    const user = {};
    if (updateUserDto.login) {
      user['login'] = updateUserDto.login;
    }
    if (updateUserDto.name) {
      user['name'] = updateUserDto.name;
    }
    if (updateUserDto.patronymic) {
      user['patronymic'] = updateUserDto.patronymic;
    }
    if (updateUserDto.surname) {
      user['surname'] = updateUserDto.surname;
    }
    if (updateUserDto.avatar) {
      user['avatar'] = updateUserDto.avatar;
    }
    if(Object.keys(user).length > 0){
      await this.userUpdateService.updateUser(user, id)
    }else{
      throw new HttpException(
        { 
          "statusCode": 400,
          "message": [
            'Укажите что хотите изменить у пользователя',
            'login',
            'name',
            'patronymic',
            'surname',
            'avatar'
          ]
        },
        HttpStatus.FORBIDDEN
      );
    }
  }
}