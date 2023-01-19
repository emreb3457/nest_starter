import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/entity/user.entity';
import { CreateUserDto, LoginUserDto } from 'src/dto/user.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Auth } from 'src/decorators/customDecorators';
import { QueryType, Roles } from 'src/types/type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('/login')
  async login(@Body() user: LoginUserDto): Promise<any> {
    const lUser = await this.userService.loginUser(user.email, user.password);

    if (!lUser) {
      throw new NotFoundException();
    }

    const token = await this.userService.createToken(lUser);

    return {
      success: true,
      token,
    };
  }

  @Auth(Roles.ADMIN)
  @Get('/get-users')
  async getUsers(@Query() query: QueryType): Promise<any> {
    const { limit, page } = query;
    return await this.userService.getUsers(limit, page);
  }
}
