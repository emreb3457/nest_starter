import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    super(message || 'Bad Request', HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(message || 'Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(message || 'Not Found', HttpStatus.NOT_FOUND);
  }
}

export class ConflictException extends HttpException {
  constructor(message?: string) {
    super(message || 'Conflict', HttpStatus.CONFLICT);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message?: string) {
    super(message || 'Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message?: string) {
    super(message || 'Forbidden', HttpStatus.FORBIDDEN);
  }
}
