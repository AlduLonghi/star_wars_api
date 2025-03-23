import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './infrastructure/persitance/repositories/mongodb/schemas/user.schema';
import { UserRepository } from './infrastructure/persitance/repositories/mongodb/user.repository';
import { UsersResolver } from './infrastructure/interface/graphql/Users.resolver';
import { GetUserUseCase } from './application/use-cases/GetUser';
import { User } from './domain/entities/user';
import { usersProviders } from './infrastructure/providers';
import { GetUserByEmailUseCase } from './application/use-cases/GetUserByEmail';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserRepository, UsersResolver, ...usersProviders],
  exports: [GetUserUseCase, GetUserByEmailUseCase],
})
export class UsersModule {}
