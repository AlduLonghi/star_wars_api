import { Injectable } from "@nestjs/common";
import { Movie } from "../../domain/entities/movie";
import { MovieRepositoryPort } from "../../domain/ports";

@Injectable()
export class GetMovieByTitle {
  constructor(private readonly movieRepository: MovieRepositoryPort) {}

  async find(title: string): Promise<Movie | Error> {
    const results = await this.movieRepository.findAll({ title });
    
    if (results === null) {
      return new Error('Movie not found');
    }

    return results[0];
  }
}