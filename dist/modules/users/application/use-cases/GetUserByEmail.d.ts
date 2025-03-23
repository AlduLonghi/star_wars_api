import { UserRepositoryPort } from '../../domain/ports/user.ports';
import { User } from '../../domain/entities/user';
export declare class GetUserByEmailUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryPort);
    execute(email: string): Promise<User | null>;
}
