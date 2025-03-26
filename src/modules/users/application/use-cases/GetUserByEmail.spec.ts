import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import { GetUserByEmailUseCase } from './GetUserByEmail';
import { UserRepositoryPort } from '../../domain/ports/user.ports';
import { MockUser } from '../../domain/entities/user.mock';
import { UserRepositoryMock } from '../../infrastructure/persitance/repositories/mongodb/user.repository.mock';

describe('GetUserByEmailUseCase', () => {
  let getUserByEmailUseCase: GetUserByEmailUseCase;
  let userRepositoryMockInstance: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryMock,
        {
          provide: GetUserByEmailUseCase,
          useFactory: (userRepository: UserRepositoryPort) => {
            return new GetUserByEmailUseCase(userRepository);
          },
          inject: [UserRepositoryMock],
        },
      ],
    }).compile();

    getUserByEmailUseCase = module.get<GetUserByEmailUseCase>(GetUserByEmailUseCase);
    userRepositoryMockInstance = module.get<UserRepositoryMock>(UserRepositoryMock);
  });

  it('should be defined', () => {
    expect(getUserByEmailUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a user if found by email', async () => {
      userRepositoryMockInstance.findByEmail.mockResolvedValue(MockUser);

      const result = await getUserByEmailUseCase.execute(MockUser.email);

      expect(userRepositoryMockInstance.findByEmail).toHaveBeenCalledWith(MockUser.email);
      expect(result).toEqual(MockUser);
    });

    it('should return null if user is not found', async () => {
      userRepositoryMockInstance.findByEmail.mockResolvedValue(null);

      const result = await getUserByEmailUseCase.execute('non-existing-email@example.com');

      expect(userRepositoryMockInstance.findByEmail).toHaveBeenCalledWith('non-existing-email@example.com');
      expect(result).toBeNull();
    });

    it('should throw an error if repository fails', async () => {
      userRepositoryMockInstance.findByEmail.mockRejectedValue(new Error('Database error'));

      await expect(getUserByEmailUseCase.execute(MockUser.email)).rejects.toThrow('Database error');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
