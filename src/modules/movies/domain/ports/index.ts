import { Movie } from "../entities/movie";

export interface CreateMoviePort {
  create(movie: Movie): Promise<Movie | null>;
}

export interface FindAllPort {
  findAll(filter: Partial<Movie>): Promise<Movie[] | null>;
}

export interface FindMovieByNamePort {
  findById(id: string): Promise<Movie | null>;
}

export interface UpdateMoviePort {
  update(id: string, movie: Partial<Movie>): Promise<Movie | null>;
}

export type MovieRepositoryPort = CreateMoviePort & FindAllPort & FindMovieByNamePort & UpdateMoviePort