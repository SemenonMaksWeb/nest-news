import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UserMainService } from 'src/user/server/user-main.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { RoleInterface } from 'src/roles/role.interfaces';
import { Roles } from 'src/roles/roles.decorator';

@Controller('user')
export class UserMainController {
  constructor(private readonly userMainService: UserMainService) {}
  @Roles([RoleInterface.users])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.userMainService.getProfile(req['userData']);
  }
}
