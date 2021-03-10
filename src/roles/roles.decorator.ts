import { SetMetadata } from '@nestjs/common';
import { RoleInterface } from 'src/roles/role.interfaces';
export const Roles = (Roles: RoleInterface[]) => SetMetadata('roles', Roles);
