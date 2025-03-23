import { JwtService } from '@nestjs/jwt';
import { GetUserByEmailUseCase } from 'src/modules/users/application/use-cases/GetUserByEmail';
export declare class LoginUseCase {
    private readonly getUserByEmail;
    private readonly jwtService;
    constructor(getUserByEmail: GetUserByEmailUseCase, jwtService: JwtService);
    execute(email: string, password: string): Promise<{
        accessToken: string;
    }>;
}
