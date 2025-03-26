import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RegisterUseCase } from '../../../application/use-cases/Register';
import { GetUserUseCase } from '../../../application/use-cases/GetUser';
import { UpdateUserUseCase } from '../../../application/use-cases/UpdateUser';
import { RegisterDto, UpdateUserInput, UserDto } from '../../../infrastructure/interface/graphql/dtos';
import { GraphqlAuthGuard } from '../../../../../shared/infrastructure/interface/graphql/guards/auth.guard';
import { RolesGuard } from '../../../../../shared/infrastructure/interface/graphql/guards/roles.guard';
import { User } from '../../../domain/entities/user';
import { Roles } from '../../../../../shared/infrastructure/interface/graphql/decorators/roles.decorator';

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
  @UseGuards(GraphqlAuthGuard, RolesGuard)
  @Roles.setRoles('ADMIN')
  async getUser(@Args('id') id: string) {
    return this.getUserUseCase.execute(id);
  }

  @Mutation(() => UserDto)
  @UseGuards(GraphqlAuthGuard, RolesGuard)
  @Roles.setRoles('USER', 'ADMIN')
  async updateUser(@Args('id') id: string, @Args('updateData') updateData: UpdateUserInput) {
    return this.updateUserUseCase.execute(id, updateData);
  }
}
