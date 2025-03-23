import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from '../../users/domain/user.entity';
import { LoginInput, LoginResponse, RegisterInput, RegisterResponse } from 'src/modules/auth/entities/dtos';
import { LoginUseCase } from 'src/modules/auth/application/use-cases/Login';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Mutation(() => LoginResponse)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginResponse> {
    return this.loginUseCase.execute(loginInput.email, loginInput.password);
  }
}
