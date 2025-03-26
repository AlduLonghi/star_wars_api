import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from '../../../../domain/entities/movie';
import { MovieRepositoryPort } from '../../../../domain/ports';

@Injectable()
export class MovieRepository implements MovieRepositoryPort {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async create(movie: Movie): Promise<Movie | Error> {
    try {
      const createdMovie = await this.movieModel.create(movie);
      return createdMovie;
    } catch (e) {
      return e;
    }
  }

  async findById(id: string): Promise<Movie | Error> {
    try {
      const result = await this.movieModel.findById(id).exec();

      return result ? result : new Error('Entity not found');
    } catch (e) {
      return e;
    }
  }

  async findAll(filter?: Partial<Movie>): Promise<Movie[] | Error> {
    try {
      const result = await this.movieModel.find(filter ? filter : {}).exec();
      return result;
    } catch (e) {
      return e;
    }
  }

  async update(id: string, movie: Partial<Movie>): Promise<Movie | Error> {
    try {
      const result =  await this.movieModel.findByIdAndUpdate(id, movie, { new: true }).exec();
      return result ? result : new Error('Eror updating entity');
    } catch (e) {
      return e;
    }
  }
}
