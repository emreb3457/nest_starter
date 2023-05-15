import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import * as bcryptjs from 'bcryptjs';
import { CommonRepository } from 'src/repository/base.repository';
import { Roles, userRoleId } from 'src/types/type';
import { UserRepository } from 'src/repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UserRepository,
    private jwtService: JwtService,
    private repositoryService: CommonRepository,
  ) {}

  async createToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role_id.type,
      company: user.company_id,
    };

    return await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = Object.assign(new User(), createUserDto);
    user.role_id = userRoleId.get(Roles.ADMIN) as any;
    user.password = await bcryptjs.hash(createUserDto.password, 10);
    return this.usersRepository.saveUser(user);
  }

  async loginUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const isVerifiedUser = await bcryptjs.compare(password, user.password);

    if (isVerifiedUser) {
      return user;
    }

    return null;
  }

  async getUsers(limit: string, page: string): Promise<any> {
    const users = await this.repositoryService.paginate(
      'User',
      parseInt(page),
      parseInt(limit),
    );
    return users;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.usersRepository.getUserById(id);
    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const updateUser = await this.usersRepository.updateUser(updateUserDto);
    return updateUser;
  }

  async deleteCompany(id: number) {
    await this.usersRepository.deleteUser(id);
  }
}
