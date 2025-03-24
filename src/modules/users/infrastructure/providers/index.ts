import { Provider } from '@nestjs/common';
import { RegisterUseCase } from '../../application/use-cases/Register';
import { GetUserUseCase } from '../../application/use-cases/GetUser';
import { UpdateUserUseCase } from '../../application/use-cases/UpdateUser';
import { UserRepositoryPort } from '../../domain/ports/user.ports';
import { UserRepository } from '../persitance/repositories/mongodb/user.repository';
import { GetUserByEmailUseCase } from '../../application/use-cases/GetUserByEmail';


export const usersProviders: Provider[] = [
  {
    provide: RegisterUseCase,
    useFactory: (userRepository: UserRepositoryPort) => new RegisterUseCase(userRepository),
    inject: [UserRepository],
  },
  {
    provide: GetUserUseCase,
    useFactory: (userRepository: UserRepositoryPort) => new GetUserUseCase(userRepository),
    inject: [UserRepository],
  },
  {
    provide: UpdateUserUseCase,
    useFactory: (userRepository: UserRepositoryPort) => new UpdateUserUseCase(userRepository),
    inject: [UserRepository],
  },
  {
    provide: GetUserByEmailUseCase,
    useFactory: (userRepository: UserRepositoryPort) => new GetUserByEmailUseCase(userRepository),
    inject: [UserRepository],
  },
];