import { Injectable } from "@nestjs/common";
import { Movie } from "../../domain/entities/movie";
import { MovieRepositoryPort } from "../../domain/ports";

@Injectable()
export class UpdateMovie {
  constructor(private readonly movieRepository: MovieRepositoryPort) {}

  async update(id: string, movie: Partial<Movie>): Promise<Movie | Error> {
    return this.movieRepository.update(id, movie);
  }
}