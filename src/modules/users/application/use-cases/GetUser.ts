import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/ports/user.ports';
import { User } from '../../domain/entities/user';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly usersRepository: UserRepositoryPort) {}

  async execute(userId: string): Promise<User | null> {
    return this.usersRepository.findById(userId);
  }
}
