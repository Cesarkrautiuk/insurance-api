import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);

    const user = this.repo.create({
      email: dto.email,
      password: hash,
    });

    return this.repo.save(user);
  }
  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
}
