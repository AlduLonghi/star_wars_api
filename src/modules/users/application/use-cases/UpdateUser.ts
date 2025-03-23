import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/ports/user.ports';
import { User } from '../../domain/entities/user';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UserRepositoryPort) {}

  async execute(userId: string, updateUserDto: Partial<User>): Promise<User | null> {
    return this.usersRepository.update(userId, updateUserDto);
  }
}
