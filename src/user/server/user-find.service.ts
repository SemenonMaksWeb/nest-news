import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '../users.entity';

@Injectable()
export class UserFindService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  async findUserEmailOrLogin(login?: string, email?: string): Promise<Users> {
    return await this.userRepository
      .createQueryBuilder('data')
      .where('data.login = :login', { login: login })
      .orWhere('data.email = :email', { email: email })
      .getOne();
  }
  async findUserId(id: number) {
    return await this.userRepository.findOne(id);
  }
}
