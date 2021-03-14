import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { RoleInterface } from 'src/roles/role.interfaces';
import { Roles } from 'src/roles/roles.decorator';

import { ApiResponse } from '@nestjs/swagger';
import { UserAdminService } from 'src/user/server/admin/user-admin.server';
@Controller('admin/user')
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) {}
  @Put('/ban:id')
  @Roles([RoleInterface.admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    type: String,
    description: 'Admin бан user по id',
  })
  async banUser(@Param('id') id: string) {
    return await this.userAdminService.banUser(id);
  }
  @Put('/razban:id')
  @Roles([RoleInterface.admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    type: String,
    description: 'Admin разбан user по id',
  })
  async razbanUser(@Param('id') id: string) {
    return await this.userAdminService.razbanUser(id);
  }
}
