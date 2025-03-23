import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../../users/infrastructure/users.module';
import { JwtStrategy } from '../infrastructure/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { authProviders } from '../infrastructure/providers/auth.providers';
import { AuthResolver } from './infrastructure/interface/graphql/auth.resolver';


@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    UsersModule,
  ],
  providers: [AuthResolver, JwtStrategy, ...authProviders],
})
export class AuthModule {}