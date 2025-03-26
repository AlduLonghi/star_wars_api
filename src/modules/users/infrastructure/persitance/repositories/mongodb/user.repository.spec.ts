/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { UserRepository } from './user.repository';
import { User } from './schemas/user.schema';
import { MockUser } from '../../../../domain/entities/user.mock';
import { Role } from '../../../../domain/entities/user';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userModel: Model<User>;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: mongoose.model(User.name, new mongoose.Schema<User>({ name: String, email: String })),
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(async () => {
    await userModel.deleteMany({});
    mongoose.deleteModel(User.name);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const result = await userRepository.create(MockUser);

      expect(result).toBeDefined();
      if (result instanceof Error) {
        fail('Expected a created user but got an Error');
      }
      expect(result).toHaveProperty('_id');
      expect(result.name).toBe(MockUser.name);
    });

    it('should return an error if creation fails', async () => {
      jest.spyOn(userModel, 'create').mockRejectedValue(new Error('Database error'));
      try {
         await userRepository.create({ name: 'Fail User', email: 'fail@example.com', id: '124', password: '1234', role: Role.USER });
      } catch (e) {
         expect(e).toStrictEqual(new Error('Database error'));
      }
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      const mockUser = await userModel.create({ name: 'John Doe', email: 'john.doe@example.com' });
      const result = await userRepository.findById(mockUser._id.toString());

      expect(result).toBeDefined();
      if (result instanceof Error) {
        fail('Expected a User but got an Error');
      }
      expect(result).toHaveProperty('_id');
      expect(result.name).toBe('John Doe');
    });

    it('should return an error if user not found', async () => {
      const result = await userRepository.findById(new mongoose.Types.ObjectId().toString());
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('Entity not found');
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const mockUser = await userModel.create({ name: 'Jane Doe', email: 'jane.doe@example.com' });
      const result = await userRepository.findByEmail(mockUser.email);

      expect(result).toBeDefined();
      if (result instanceof Error) {
        fail('Expected a User but got an Error');
      }
      expect(result).toHaveProperty('_id');
      expect(result.email).toBe('jane.doe@example.com');
    });

    it('should return an error if user not found', async () => {
      try {
        await userRepository.findByEmail('non-existing-email@example.com');
      } catch (e) {
        expect(e).toStrictEqual(new Error('user not found'));
      }
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const mockUser = await userModel.create({ name: 'Original Name', email: 'original.email@example.com' });
      const updatedUser = await userRepository.update(mockUser._id.toString(), { name: 'Updated Name' });

      expect(updatedUser).toBeDefined();
      if (updatedUser instanceof Error) {
        fail('Expected an updated user but got an Error');
      }
      expect(updatedUser.name).toBe('Updated Name');
    });

    it('should return an error if user does not exist', async () => {
      const result = await userRepository.update(new mongoose.Types.ObjectId().toString(), { name: 'New Name' });
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('Eror updating entity');
    });

    it('should return an error if update operation fails', async () => {
    const mockQuery = {
    exec: jest.fn().mockRejectedValue(new Error('Database error')),
     };
     jest.spyOn(userModel, 'findByIdAndUpdate').mockReturnValue(mockQuery as any);
      const result = await userRepository.update(new mongoose.Types.ObjectId().toString(), { name: 'New Name' });
      expect(result).toBeInstanceOf(Error);
    });
  });
});
