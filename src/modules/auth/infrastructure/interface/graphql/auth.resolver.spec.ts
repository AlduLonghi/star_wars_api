import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { LoginUseCase } from '../../../application/use-cases/Login';
import { UnauthorizedException } from '@nestjs/common';
import { LoginInput, LoginResponse } from '../../../domain';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  let loginUseCase: LoginUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: LoginUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    authResolver = module.get<AuthResolver>(AuthResolver);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should be defined', () => {
    expect(authResolver).toBeDefined();
  });

  describe('login', () => {
    it('should call loginUseCase.execute and return an access token', async () => {
      const loginInput: LoginInput = { email: 'test@example.com', password: 'password123' };
      const mockResponse: LoginResponse = { accessToken: 'mock_token' };

      jest.spyOn(loginUseCase, 'execute').mockResolvedValue(mockResponse);

      const result = await authResolver.login(loginInput);

      expect(loginUseCase.execute).toHaveBeenCalledWith(loginInput.email, loginInput.password);
      expect(result).toEqual(mockResponse);
    });

    it('should return an error if login fails', async () => {
      const loginInput: LoginInput = { email: 'test@example.com', password: 'wrongpassword' };
      const mockError = new UnauthorizedException('Invalid credentials');

      jest.spyOn(loginUseCase, 'execute').mockRejectedValue(mockError);

      await expect(authResolver.login(loginInput)).rejects.toThrow(UnauthorizedException);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
