import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './modules/users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
     MongooseModule.forRoot('mongodb://admin:pass@localhost:27017'),
     GraphQLModule.forRoot<ApolloDriverConfig>({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
