import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/users/domain/entities/user';
import { UserRepositoryPort } from 'src/modules/users/domain/ports/user.ports';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>, // Inyectamos el modelo de User
  ) {}

  async create(userDto: User): Promise<User | null> {
    try {
      const createdUser = new this.userModel(userDto);
      const savedUser = await createdUser.save();
      return savedUser;
    } catch {
       return null
    }
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.userModel.findOne({ email }).exec();
    return user;
  }

  async update(id: string, updateUser: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUser, { new: true }).exec();
  }
}
