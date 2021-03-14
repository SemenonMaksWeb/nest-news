import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { UserUpdateService } from 'src/user/server/main/user-update.service';
import { UserFindService } from 'src/user/server/main/user-find.service';
// import { Users } from 'src/user/users.entity';

@Injectable()
export class UserAdminService {
  constructor(
    private readonly userUpdateService: UserUpdateService,
    private readonly userFindService: UserFindService, // @InjectRepository(Users) // private readonly userRepository: Repository<Users>,
  ) {}
  async checkBanUser(id: string) {
    const user = await this.userFindService.findUserId(Number(id));
    if (user === undefined) {
      throw new HttpException(
        {
          statusCode: 400,
          message: `Пользователь по id: ${id} не найден`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async banUser(id: string) {
    await this.checkBanUser(id);
    await this.userUpdateService.updateUser({ active: false }, id);
    return `Пользователь с ${id} успешно забанен`;
  }
  async razbanUser(id: string) {
    await this.checkBanUser(id);
    await this.userUpdateService.updateUser({ active: true }, id);
    return `Пользователь с ${id} успешно разбанен`;
  }
}
