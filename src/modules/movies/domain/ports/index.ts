import { Movie } from "../entities/movie";

export interface CreateMoviePort {
  create(movie: Movie): Promise<Movie | Error>;
}

export interface FindAllPort {
  findAll(filter?: Partial<Movie>): Promise<Movie[] | Error>;
}

export interface FindByIdPort {
  findById(id: string): Promise<Movie | Error>;
}

export interface UpdateMoviePort {
  update(id: string, movie: Partial<Movie>): Promise<Movie | Error>;
}

export type MovieRepositoryPort = CreateMoviePort & FindAllPort & FindByIdPort & UpdateMoviePort