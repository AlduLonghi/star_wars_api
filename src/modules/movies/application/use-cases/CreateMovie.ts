import { Injectable } from "@nestjs/common";
import { Movie } from "../../domain/entities/movie";
import { MovieRepositoryPort } from "../../domain/ports";

@Injectable()
export class CreateMovie {
  constructor(private readonly movieRepository: MovieRepositoryPort) {}

  async create(movie: Movie): Promise<Movie | Error> {
    return this.movieRepository.create(movie);
  }
}