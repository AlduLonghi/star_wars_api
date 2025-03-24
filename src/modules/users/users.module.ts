import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './infrastructure/persitance/repositories/mongodb/schemas/user.schema';
import { UserRepository } from './infrastructure/persitance/repositories/mongodb/user.repository';
import { UsersResolver } from './infrastructure/interface/graphql/user.resolver';
import { GetUserUseCase } from './application/use-cases/GetUser';
import { User } from './domain/entities/user';
import { usersProviders } from './infrastructure/providers';
import { GetUserByEmailUseCase } from './application/use-cases/GetUserByEmail';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule, ConfigModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [JwtService, UserRepository, UsersResolver, ...usersProviders],
  exports: [GetUserUseCase, GetUserByEmailUseCase],
})
export class UsersModule {}
