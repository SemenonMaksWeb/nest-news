import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { RoleInterface } from './role.interfaces';
import { UserFindService } from 'src/user/server/main/user-find.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userFindService: UserFindService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request['user'];
    const roles = this.reflector.get<RoleInterface[]>(
      'roles',
      context.getHandler(),
    );
    const userId = await this.userFindService.findUserId(user.id);
    request['userData'] = userId;
    if (!userId.proven) {
      throw new HttpException('Ваш аккаунт не активен', HttpStatus.FORBIDDEN);
    }
    if (!userId.active) {
      throw new HttpException('Ваш аккаунт забанен', HttpStatus.FORBIDDEN);
    }
    const checkRoles = userId.role.filter((elem) => {
      return roles.indexOf(elem) !== -1;
    });
    return checkRoles.length !== 0; // Проверка что роль совпадает
  }
}
