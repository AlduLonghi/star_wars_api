import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from 'src/modules/auth/application/use-cases/Login';
import { RegisterUseCase } from 'src/modules/auth/application/use-cases/Register';
import { LoginPort, RegisterPort } from 'src/modules/auth/entities';

export const authProviders: Provider[] = [
  {
    provide: LoginPort,
    useFactory: (usersService: UsersService, jwtService: JwtService) => {
      return new LoginUseCase(usersService, jwtService);  // Inyecta UsersService y JwtService en LoginUseCase
    },
    inject: [UsersService, JwtService], // Inyectamos UsersService y JwtService
  },
];
