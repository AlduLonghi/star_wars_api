import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RegisterUseCase } from 'src/modules/users/application/use-cases/Register';
import { GetUserUseCase } from 'src/modules/users/application/use-cases/GetUser';
import { UpdateUserUseCase } from 'src/modules/users/application/use-cases/UpdateUser';
import { RegisterDto, UpdateUserInput, UserDto } from 'src/modules/users/infrastructure/interface/graphql/dtos';
import { AuthGuard } from '../../../../../shared/infrastructure/interface/graphql/guards/auth.guard';
import { RolesGuard } from '../../../../../shared/infrastructure/interface/graphql/guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { User } from 'src/modules/users/domain/entities/user';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Mutation(() => UserDto)
  async register(@Args('registerData') registerData: RegisterDto) {
    return this.registerUseCase.execute(registerData as User);
  }

  @Query(() => UserDto)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getUser(@Args('id') id: string) {
    return this.getUserUseCase.execute(id);
  }

  @Mutation(() => UserDto)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('USER', 'ADMIN')
  async updateUser(@Args('id') id: string, @Args('updateData') updateData: UpdateUserInput) {
    return this.updateUserUseCase.execute(id, updateData);
  }
}
