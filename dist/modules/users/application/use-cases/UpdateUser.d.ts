import { UserRepositoryPort } from '../../domain/ports/user.ports';
import { User } from '../../domain/entities/user';
export declare class UpdateUserUseCase {
    private readonly usersRepository;
    constructor(usersRepository: UserRepositoryPort);
    execute(userId: string, updateUserDto: Partial<User>): Promise<User | null>;
}
