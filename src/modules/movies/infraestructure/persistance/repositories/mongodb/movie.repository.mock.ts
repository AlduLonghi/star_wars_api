import { Movie } from "../../../../domain/entities/movie";
import { MockMovie } from "../../../../domain/entities/movie.mock";
import { MovieRepositoryPort } from "../../../../domain/ports";

export class MovieRepositoryMock implements MovieRepositoryPort {
  create = jest.fn(async (_movie: Movie): Promise<Movie | Error> => {
    void _movie
    return MockMovie;
  });

  findById = jest.fn(async (_id: string): Promise<Movie | Error> => {
    void _id
    return MockMovie;
  });

  findAll = jest.fn(async (_filter?: Partial<Movie>): Promise<Movie[] | Error> => {
    void _filter
    return [MockMovie];
  });

  update = jest.fn(async (_id: string, _movie: Partial<Movie>): Promise<Movie | Error> => {
    void _id
    void _movie
    return MockMovie;
});
}