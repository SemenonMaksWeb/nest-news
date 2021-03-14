import { UserMainController } from './controller/user.controller';
import { UserAdminController } from './controller/user-admin-controller';
import { UserAdminService } from './server/admin/user-admin.server';
import { UserMainService } from './server/main/user-main.service';
import { UserUpdateService } from './server/main/user-update.service';
import { UserFindService } from './server/main/user-find.service';
import { Users } from './users.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserMainController, UserAdminController],
  providers: [
    UserMainService,
    UserUpdateService,
    UserFindService,
    UserAdminService,
  ],
  exports: [UserMainService, UserUpdateService, UserFindService],
})
export class UserModule {}
