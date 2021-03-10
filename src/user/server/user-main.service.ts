import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '../users.entity';
import { UserFindService } from './user-find.service';
import { UserProfile } from '../interface/user-profie.intefrace';

@Injectable()
export class UserMainService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly userFindService: UserFindService,
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
}
