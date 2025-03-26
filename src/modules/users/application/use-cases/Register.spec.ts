import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import * as bcrypt from 'bcrypt';
import { UserRepositoryPort } from '../../domain/ports/user.ports';
import { MockUser } from '../../domain/entities/user.mock';
import { RegisterUseCase } from './Register';
import { UserRepositoryMock } from '../../infrastructure/persitance/repositories/mongodb/user.repository.mock';

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let userRepositoryMockInstance: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryMock,
        {
          provide: RegisterUseCase,
          useFactory: (userRepository: UserRepositoryPort) => {
            return new RegisterUseCase(userRepository);
          },
          inject: [UserRepositoryMock],
        },
      ],
    }).compile();

    registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
    userRepositoryMockInstance = module.get<UserRepositoryMock>(UserRepositoryMock);
  });

  it('should be defined', () => {
    expect(registerUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create a user with a hashed password', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      userRepositoryMockInstance.create.mockResolvedValue({ ...MockUser, password: 'hashedPassword' });

      const result = await registerUseCase.execute(MockUser);

      expect(bcrypt.hash).toHaveBeenCalledWith(MockUser.password, 10);
      expect(userRepositoryMockInstance.create).toHaveBeenCalledWith({ ...MockUser, password: 'hashedPassword' });
      expect(result).toEqual({ ...MockUser, password: 'hashedPassword' });
    });

    it('should return null if user creation fails', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      userRepositoryMockInstance.create.mockResolvedValue(null);

      const result = await registerUseCase.execute(MockUser);

      expect(result).toBeNull();
    });

    it('should throw an error if hashing fails', async () => {
      jest.spyOn(bcrypt, 'hash').mockRejectedValue(new Error('Hashing error'));

      await expect(registerUseCase.execute(MockUser)).rejects.toThrow('Hashing error');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
