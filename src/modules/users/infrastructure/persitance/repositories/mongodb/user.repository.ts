import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../../domain/entities/user';
import { UserRepositoryPort } from '../../../../domain/ports/user.ports';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>, // Inyectamos el modelo de User
  ) {}

  async create(userDto: User): Promise<User | Error> {
    try {
      const createdUser = new this.userModel(userDto);
      const savedUser = await createdUser.save();
      return savedUser;
    } catch (e) {
       return e;
    }
  }

  async findById(id: string): Promise<User | Error> {
    try {
      const result = await this.userModel.findById(id).exec();
      return result ? result : new Error('Entity not found');
    } catch (e) {
      return e;
    }
  }

  async findByEmail(email: string): Promise<User | Error> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      return user ? user : new Error('user not found');
    } catch (e) {
      return e;
    }
  }

  async update(id: string, updateUser: Partial<User>): Promise<User | Error> {
     try {
      const result =  await this.userModel.findByIdAndUpdate(id, updateUser, { new: true }).exec();
      return result ? result : new Error('Eror updating entity');
    } catch (e) {
      return e;
    }
  }
}
