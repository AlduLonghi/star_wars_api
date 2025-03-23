import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from 'src/modules/auth/application/use-cases/Login';
import { GetUserByEmailUseCase } from 'src/modules/users/application/use-cases/GetUserByEmail';

export const authProviders: Provider[] = [
  {
    provide: LoginUseCase,
    useFactory: (getUserByEmail: GetUserByEmailUseCase, jwtService: JwtService) => {
      return new LoginUseCase(getUserByEmail, jwtService); 
    },
    inject: [GetUserByEmailUseCase, JwtService], 
  },
];
