import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import { GetUserUseCase } from './GetUser';
import { UserRepositoryMock } from '../../infrastructure/persitance/repositories/mongodb/user.repository.mock';
import { UserRepositoryPort } from '../../domain/ports/user.ports';
import { MockUser } from '../../domain/entities/user.mock';


describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
  let userRepositoryMockInstance: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryMock,
        {
          provide: GetUserUseCase,
          useFactory: (userRepository: UserRepositoryPort) => {
            return new GetUserUseCase(userRepository);
          },
          inject: [UserRepositoryMock],
        },
      ],
    }).compile();

    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
    userRepositoryMockInstance = module.get<UserRepositoryMock>(UserRepositoryMock);
  });

  it('should be defined', () => {
    expect(getUserUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a user if found', async () => {
      userRepositoryMockInstance.findById.mockResolvedValue(MockUser);

      const result = await getUserUseCase.execute(MockUser.id);

      expect(userRepositoryMockInstance.findById).toHaveBeenCalledWith(MockUser.id);
      expect(result).toEqual(MockUser);
    });

    it('should return null if user is not found', async () => {
      userRepositoryMockInstance.findById.mockResolvedValue(null);

      const result = await getUserUseCase.execute('non-existing-id');

      expect(userRepositoryMockInstance.findById).toHaveBeenCalledWith('non-existing-id');
      expect(result).toBeNull();
    });

    it('should throw an error if repository fails', async () => {
      userRepositoryMockInstance.findById.mockRejectedValue(new Error('Database error'));

      await expect(getUserUseCase.execute(MockUser.id)).rejects.toThrow('Database error');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
