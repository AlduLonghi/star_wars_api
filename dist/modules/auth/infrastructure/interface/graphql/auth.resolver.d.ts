import { LoginInput, LoginResponse } from 'src/modules/auth/domain/dtos';
import { LoginUseCase } from 'src/modules/auth/application/use-cases/Login';
export declare class AuthResolver {
    private readonly loginUseCase;
    constructor(loginUseCase: LoginUseCase);
    login(loginInput: LoginInput): Promise<LoginResponse>;
}
