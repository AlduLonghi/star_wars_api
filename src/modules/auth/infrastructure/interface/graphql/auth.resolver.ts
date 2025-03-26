import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginInput, LoginResponse } from '../../../domain/dtos';
import { LoginUseCase } from '../../../application/use-cases/Login';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Mutation(() => LoginResponse)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginResponse | Error> {
    return this.loginUseCase.execute(loginInput.email, loginInput.password);
  }
}
