import { UserRepositoryPort } from "src/modules/users/domain/ports/user.ports";

export class UserRepositoryMock implements UserRepositoryPort {
  create = jest.fn().mockResolvedValue(null);
  findById = jest.fn().mockResolvedValue(null);
  findByEmail = jest.fn().mockResolvedValue(null);
  update = jest.fn().mockResolvedValue(null);
}
