import {
  Body,
  Controller,
  Get,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UserMainService } from 'src/user/server/main/user-main.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { RoleInterface } from 'src/roles/role.interfaces';
import { Roles } from 'src/roles/roles.decorator';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
export class UserMainController {
  constructor(private readonly userMainService: UserMainService) {}
  @Roles([RoleInterface.users])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.userMainService.getProfile(req['userData']);
  }
  @Roles([RoleInterface.users])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('profile')
  async updateProfile(
    @Request() req,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return await this.userMainService.updateProfile(
      req['userData']['id'],
      updateUserDto,
    );
  }
}
