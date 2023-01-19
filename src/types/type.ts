import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: any;
}

export enum Roles {
  SUPERADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  COMPANY_SUPER_ADMIN = 'COMPANY_SUPER_ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  COMPANY_DRIVER = 'COMPANY_DRIVER',
}

export const userRoleId = new Map([
  [Roles.SUPERADMIN, 1],
  [Roles.ADMIN, 2],
  [Roles.COMPANY_SUPER_ADMIN, 3],
  [Roles.COMPANY_ADMIN, 4],
  [Roles.COMPANY_DRIVER, 5],
]);

export type QueryType = {
  role: string;
  sort: string;
  page: string;
  limit: string;
};
