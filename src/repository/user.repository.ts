import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import BaseRepository from './base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User>{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        role_id: true,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: {
        role_id: true,
        company_id: true,
      },
    });
  }

  async saveUser(user: User) {
    return this.userRepository.save(user);
  }

  async updateUser(userData: UpdateUserDto) {
    return this.userRepository.save({ ...userData });
  }

  async deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
