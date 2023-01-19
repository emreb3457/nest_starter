import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthRole, AuthToken, CompanyGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/types/type';

export function Auth(...roles: Roles[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthToken, AuthRole),
    ApiBearerAuth(),
  );
}

export function CompanyScope() {
  return applyDecorators(UseGuards(CompanyGuard));
}
