import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../domain/ports/user.ports';
import { User } from '../../domain/entities/user';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(email: string): Promise<User | Error> {
    return this.userRepository.findByEmail(email);
  }
}
