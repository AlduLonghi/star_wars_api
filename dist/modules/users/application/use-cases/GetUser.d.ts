import { UserRepositoryPort } from '../../domain/ports/user.ports';
import { User } from '../../domain/entities/user';
export declare class GetUserUseCase {
    private readonly usersRepository;
    constructor(usersRepository: UserRepositoryPort);
    execute(userId: string): Promise<User | null>;
}
