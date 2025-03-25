import { Injectable } from "@nestjs/common";
import { Movie } from "../../domain/entities/movie";
import { MovieRepositoryPort } from "../../domain/ports";

@Injectable()
export class GetMovieByTitle {
  constructor(private readonly movieRepository: MovieRepositoryPort) {}

  async find(title: string): Promise<Movie | null> {
    const results = this.movieRepository.findAll({ title });
    return results[0];
  }
}