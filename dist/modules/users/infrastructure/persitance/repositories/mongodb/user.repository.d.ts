import { Model } from 'mongoose';
import { User } from 'src/modules/users/domain/entities/user';
import { UserRepositoryPort } from 'src/modules/users/domain/ports/user.ports';
export declare class UserRepository implements UserRepositoryPort {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(userDto: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUser: Partial<User>): Promise<User | null>;
}
