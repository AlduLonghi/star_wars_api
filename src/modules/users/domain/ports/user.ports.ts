import { User } from "../entities/user";


export interface CreateUserPort {
  create(user: User): Promise<User | null>;
}

export interface FindUserByIdPort {
  findById(id: string): Promise<User | null>;
}

export interface FindUserByEmailPort {
  findByEmail(email: string): Promise<User | null>;
}

export interface UpdateUserPort {
  update(id: string, user: Partial<User>): Promise<User | null>;
}

export type UserRepositoryPort = CreateUserPort & FindUserByIdPort & FindUserByEmailPort & UpdateUserPort;

