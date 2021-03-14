import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFindService } from 'src/user/server/main/user-find.service';
import { Users } from '../../users.entity';

@Injectable()
export class UserUpdateService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly userFindService: UserFindService,
  ) {}
  async createUser(data: any) {
    await this.checkUpdateUser(data);
    await this.userRepository.save(data);
  }
  async updateUser(data: any, id: string) {
    await this.checkUpdateUser(data);
    await this.userRepository.update(id, data);
  }
  async checkUpdateUser(data: any) {
    if (!data.login && !data.email) {
      return;
    }
    const user = await this.userFindService.findUserEmailOrLogin(
      data.login,
      data.email,
    );
    if (user === undefined) {
      return;
    }
    if (user?.email === data.email && user?.login === data.login) {
      throw new HttpException(
        'Указанный емайл и логин заняты',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user?.email === data.email) {
      throw new HttpException('Указанный емайл занят', HttpStatus.BAD_REQUEST);
    }
    if (user?.login === data.login) {
      throw new HttpException('Указанный логин занят', HttpStatus.BAD_REQUEST);
    }
  }
}
