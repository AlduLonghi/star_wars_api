import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginUseCase } from './Login';
import { GetUserByEmailUseCase } from '../../../users/application/use-cases/GetUserByEmail';
import { Role } from '../../../users/domain/entities/user';

const mockUser = {
  id: '12345',
  email: 'test@example.com',
  name: 'jaja',
  password: bcrypt.hash('password123', 10),
  role: Role.ADMIN,
};

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let getUserByEmailUseCase: GetUserByEmailUseCase;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: GetUserByEmailUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: JwtService,
          useValue: { sign: jest.fn().mockReturnValue('mocked_token') },
        },
        LoginUseCase,
      ],
    }).compile();

    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
    getUserByEmailUseCase = module.get<GetUserByEmailUseCase>(GetUserByEmailUseCase);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(loginUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return an access token when credentials are valid', async () => {
      jest.spyOn(getUserByEmailUseCase, 'execute').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await loginUseCase.execute('test@example.com', 'password123');

      expect(getUserByEmailUseCase.execute).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', mockUser.password);
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: mockUser.id, email: mockUser.email, role: mockUser.role });
      expect(result).toEqual({ accessToken: 'mocked_token' });
    });

    it('should throw an UnauthorizedException when password is incorrect', async () => {
      jest.spyOn(getUserByEmailUseCase, 'execute').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(loginUseCase.execute('test@example.com', 'wrongpassword')).rejects.toThrow(UnauthorizedException);
    });

    it('should return an error if getUserByEmailUseCase fails', async () => {
      jest.spyOn(getUserByEmailUseCase, 'execute').mockResolvedValue(new Error('Database error'));
      
      const result = await loginUseCase.execute('test@example.com', 'password123');
      
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('Database error');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
