import { User } from "../entities/user";


export interface CreateUserPort {
  create(user: User): Promise<User | Error>;
}

export interface FindUserByIdPort {
  findById(id: string): Promise<User | Error>;
}

export interface FindUserByEmailPort {
  findByEmail(email: string): Promise<User | Error>;
}

export interface UpdateUserPort {
  update(id: string, user: Partial<User>): Promise<User | Error>;
}

export type UserRepositoryPort = CreateUserPort & FindUserByIdPort & FindUserByEmailPort & UpdateUserPort;

