import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../../domain/entities/user';
import { UserRepositoryPort } from '../../domain/ports/user.ports';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly usersRepository: UserRepositoryPort) {}

  async execute(registerDto: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return this.usersRepository.create({ ...registerDto, password: hashedPassword });
  }
}
