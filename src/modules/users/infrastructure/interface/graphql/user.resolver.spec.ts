import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUseCase } from '../../../application/use-cases/Register';
import { GetUserUseCase } from '../../../application/use-cases/GetUser';
import { UpdateUserUseCase } from '../../../application/use-cases/UpdateUser';
import { RegisterDto, UpdateUserInput } from '../../../infrastructure/interface/graphql/dtos';
import { GraphqlAuthGuard } from '../../../../../shared/infrastructure/interface/graphql/guards/auth.guard';
import { RolesGuard } from '../../../../../shared/infrastructure/interface/graphql/guards/roles.guard';
import { SharedModule } from '../../../../../shared/shared.module';
import { JwtService } from '@nestjs/jwt';
import { MockUser } from '../../../domain/entities/user.mock';
import { UsersResolver } from './user.resolver';
import { Role } from '../../../domain/entities/user';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  let registerUseCase: RegisterUseCase;
  let getUserUseCase: GetUserUseCase;
  let updateUserUseCase: UpdateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SharedModule],
      providers: [
        JwtService,
        GraphqlAuthGuard,
        RolesGuard,
        UsersResolver,
        {
          provide: RegisterUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GetUserUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateUserUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    usersResolver = module.get<UsersResolver>(UsersResolver);
    registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
  });

  it('should be defined', () => {
    expect(usersResolver).toBeDefined();
  });

  describe('register', () => {
    it('should call registerUseCase.execute and return a user', async () => {
      jest.spyOn(registerUseCase, 'execute').mockResolvedValue(MockUser);

      const registerData: RegisterDto = {
        email: MockUser.email,
        password: 'password123',
        name: MockUser.name,
        role: Role.ADMIN
      };
      
      const result = await usersResolver.register(registerData);

      expect(registerUseCase.execute).toHaveBeenCalledWith(registerData);
      expect(result).toEqual(MockUser);
    });
  });

  describe('getUser', () => {
    it('should call getUserUseCase.execute and return a user', async () => {
      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(MockUser);

      const result = await usersResolver.getUser(MockUser.id);

      expect(getUserUseCase.execute).toHaveBeenCalledWith(MockUser.id);
      expect(result).toEqual(MockUser);
    });
  });

  describe('updateUser', () => {
    it('should call updateUserUseCase.execute and return an updated user', async () => {
      jest.spyOn(updateUserUseCase, 'execute').mockResolvedValue(MockUser);

      const updateUserData: UpdateUserInput = { name: 'Updated Name' };
      const result = await usersResolver.updateUser(MockUser.id, updateUserData);

      expect(updateUserUseCase.execute).toHaveBeenCalledWith(MockUser.id, updateUserData);
      expect(result).toEqual(MockUser);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
