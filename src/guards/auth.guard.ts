import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ErrorMessages } from 'src/const/errorMessages';
import * as jwt from 'jsonwebtoken';
import { Roles } from 'src/types/type';
import { CompanyRepository } from 'src/repository/company.repository';

@Injectable()
export class AuthToken implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeaders = request.headers.authorization;
    if (!authHeaders) {
      throw new HttpException(
        ErrorMessages.no_authorization,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = authHeaders.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
    return true;
  }
}

@Injectable()
export class AuthRole implements CanActivate {
  constructor(private reflector: Reflector) {}
  matchRoles(roles: Roles[], userRole: Roles) {
    return roles.some(
      (role) => role === userRole || userRole === Roles.SUPERADMIN,
    );
  }
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Roles[]>('roles', context.getHandler());
    if (!roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.role);
  }
}

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === Roles.ADMIN || user.role === Roles.SUPERADMIN) {
      return true;
    }

    const userCompanyId = user.company.id;
    request.company_id = userCompanyId;
    return true;
  }
}

@Injectable()
export class UserScope implements CanActivate {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const body = request.body;

    if (user.role !== Roles.SUPERADMIN && user.role !== Roles.ADMIN) {
      if (body.user_id && body.user_id !== user.id) {
        throw new ForbiddenException();
      }
    }
    return true;
  }
}
