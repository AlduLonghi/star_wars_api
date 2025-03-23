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

  // Crear un nuevo usuario
  async create(userDto: User): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  // Buscar usuario por ID
  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  // Buscar usuario por correo electrónico
  async findByEmail(email: string): Promise<User | null> {
    console.log('llego aca')
    return this.userModel.findOne({ email }).exec();
  }

  // Actualizar usuario<
  async update(id: string, updateUser: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUser, { new: true }).exec();
  }
}
