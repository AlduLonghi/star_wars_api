import { Injectable } from "@nestjs/common";
import { Movie } from "../../domain/entities/movie";
import { MovieRepositoryPort } from "../../domain/ports";

@Injectable()
export class GetMovies {
  constructor(private readonly movieRepository: MovieRepositoryPort) {}

  async find(): Promise<Movie[] | Error> {
    const results = this.movieRepository.findAll();
    return results;
  }
}