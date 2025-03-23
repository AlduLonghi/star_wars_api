import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginInput, LoginResponse } from 'src/modules/auth/domain/dtos';
import { LoginUseCase } from 'src/modules/auth/application/use-cases/Login';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Mutation(() => LoginResponse)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginResponse> {
    return this.loginUseCase.execute(loginInput.email, loginInput.password);
  }
}
