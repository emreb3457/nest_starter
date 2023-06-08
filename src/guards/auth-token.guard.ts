import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ErrorMessages } from 'src/const/error-messages';
import { CustomException } from 'src/exceptions/custom.exception';
import { DecodedType, Roles } from 'src/types/type';

@Injectable()
export class AuthToken implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeaders = request.headers.authorization;
    if (!authHeaders) {
      throw new CustomException(
        ErrorMessages.no_authorization,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeaders.split(' ')[1];
    const decoded: DecodedType = jwt.verify(
      token,
      process.env.JWT_SECRET,
    ) as DecodedType;

    request.user = {
      ...decoded,
      isAdmin: [Roles.SUPER_ADMIN, Roles.ADMIN].includes(decoded.role as Roles),
    };
    return true;
  }
}
