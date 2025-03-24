import { RegisterUseCase } from 'src/modules/users/application/use-cases/Register';
import { GetUserUseCase } from 'src/modules/users/application/use-cases/GetUser';
import { UpdateUserUseCase } from 'src/modules/users/application/use-cases/UpdateUser';
import { RegisterDto, UpdateUserInput } from 'src/modules/users/infrastructure/interface/graphql/dtos';
import { User } from 'src/modules/users/domain/entities/user';
export declare class UsersResolver {
    private readonly registerUseCase;
    private readonly getUserUseCase;
    private readonly updateUserUseCase;
    constructor(registerUseCase: RegisterUseCase, getUserUseCase: GetUserUseCase, updateUserUseCase: UpdateUserUseCase);
    register(registerData: RegisterDto): Promise<User>;
    getUser(id: string): Promise<User | null>;
    updateUser(id: string, updateData: UpdateUserInput): Promise<User | null>;
}
