import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieRepositoryPort } from 'src/modules/movies/domain/ports';
import { Movie } from 'src/modules/movies/domain/entities/movie';

@Injectable()
export class MovieRepository implements MovieRepositoryPort {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async create(movie: Movie): Promise<Movie | null> {
    try {
      const createdMovie = await this.movieModel.create(movie);
      return createdMovie;
    } catch {
      return null;
    }
  }

  async findById(id: string): Promise<Movie | null> {
    try {
      const result = await this.movieModel.findById(id).exec();
      return result;
    } catch {
      return null;
    }
  }

  async findAll(filter?: Partial<Movie>): Promise<Movie[] | null> {
    try {
      const result = await this.movieModel.find(filter ? filter : {}).exec();
      return result;
    } catch {
      return null;
    }
  }

  async update(id: string, movie: Partial<Movie>): Promise<Movie | null> {
    try {
      return await this.movieModel.findByIdAndUpdate(id, movie, { new: true }).exec();
    } catch {
      return null;
    }
  }
}
