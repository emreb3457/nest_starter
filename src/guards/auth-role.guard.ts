import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/types/type';

@Injectable()
export class AuthRole implements CanActivate {
  constructor(private reflector: Reflector) {}
  matchRoles(roles: Roles[], userRole: Roles) {
    return roles.some(
      (role) => role === userRole || userRole === Roles.SUPER_ADMIN,
    );
  }
  canActivate(context: ExecutionContext): boolean {
    const roles = Reflect.getMetadata('roles', context.getHandler());

    if (!roles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.role);
  }
}
