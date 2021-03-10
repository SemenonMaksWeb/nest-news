import { UserMainController } from './controller/user.controller';
import { UserMainService } from './server/user-main.service';
import { UserUpdateService } from './server/user-update.service';
import { UserFindService } from './server/user-find.service';
import { Users } from './users.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserMainController],
  providers: [UserMainService, UserUpdateService, UserFindService],
  exports: [UserMainService, UserUpdateService, UserFindService],
})
export class UserModule {}
