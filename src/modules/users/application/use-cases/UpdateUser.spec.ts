import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import { UserRepositoryPort } from '../../domain/ports/user.ports';
import { MockUser } from '../../domain/entities/user.mock';
import { UpdateUserUseCase } from './UpdateUser';
import { UserRepositoryMock } from '../../infrastructure/persitance/repositories/mongodb/user.repository.mock';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepositoryMockInstance: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryMock,
        {
          provide: UpdateUserUseCase,
          useFactory: (userRepository: UserRepositoryPort) => {
            return new UpdateUserUseCase(userRepository);
          },
          inject: [UserRepositoryMock],
        },
      ],
    }).compile();

    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    userRepositoryMockInstance = module.get<UserRepositoryMock>(UserRepositoryMock);
  });

  it('should be defined', () => {
    expect(updateUserUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should update a user successfully', async () => {
      const updatedUser = { ...MockUser, name: 'Updated Name' };
      userRepositoryMockInstance.update.mockResolvedValue(updatedUser);

      const result = await updateUserUseCase.execute(MockUser.id, { name: 'Updated Name' });

      expect(userRepositoryMockInstance.update).toHaveBeenCalledWith(MockUser.id, { name: 'Updated Name' });
      expect(result).toEqual(updatedUser);
    });

    it('should return null if user is not found', async () => {
      userRepositoryMockInstance.update.mockResolvedValue(null);

      const result = await updateUserUseCase.execute('non-existing-id', { name: 'New Name' });

      expect(userRepositoryMockInstance.update).toHaveBeenCalledWith('non-existing-id', { name: 'New Name' });
      expect(result).toBeNull();
    });

    it('should throw an error if repository fails', async () => {
      userRepositoryMockInstance.update.mockRejectedValue(new Error('Database error'));

      await expect(updateUserUseCase.execute(MockUser.id, { name: 'Updated Name' })).rejects.toThrow('Database error');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
