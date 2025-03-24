import { User } from '../../domain/entities/user';
import { UserRepositoryPort } from '../../domain/ports/user.ports';
export declare class RegisterUseCase {
    private readonly usersRepository;
    constructor(usersRepository: UserRepositoryPort);
    execute(registerDto: User): Promise<User | null>;
}
