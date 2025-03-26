import { Test, TestingModule } from '@nestjs/testing';
import { MovieRepositoryPort } from '../../domain/ports';
import { jest } from '@jest/globals';
import { GetMovieByTitle } from './GetMovieByTitle';
import { MovieRepositoryMock } from '../../infraestructure/persistance/repositories/mongodb/movie.repository.mock';
import { MockMovie } from '../../domain/entities/movie.mock';

describe('GetMovieByTitle', () => {
  let getMovieByTitle: GetMovieByTitle;
  let movieRepositoryMockInstance: MovieRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRepositoryMock,
        {
          provide: GetMovieByTitle,
          useFactory: (movieRepository: MovieRepositoryPort) => {
            return new GetMovieByTitle(movieRepository);
          },
          inject: [MovieRepositoryMock],
        },
      ],
    }).compile();

    getMovieByTitle = module.get<GetMovieByTitle>(GetMovieByTitle);
    movieRepositoryMockInstance = module.get<MovieRepositoryMock>(MovieRepositoryMock);
  });

  it('should be defined', () => {
    expect(getMovieByTitle).toBeDefined();
  });

  describe('find', () => {
    it('should return the movie when found', async () => {
      const movieTitle = 'Star Wars: A New Hope';
      movieRepositoryMockInstance.findAll.mockResolvedValue([MockMovie]);

      const result = await getMovieByTitle.find(movieTitle);

      expect(movieRepositoryMockInstance.findAll).toHaveBeenCalledWith({ title: movieTitle });
      expect(result).toEqual(MockMovie);
    });

    it('should return null if no movie is found', async () => {
      const movieTitle = 'Non Existent Movie';
      movieRepositoryMockInstance.findAll.mockResolvedValue([]);

      const result = await getMovieByTitle.find(movieTitle);

      expect(movieRepositoryMockInstance.findAll).toHaveBeenCalledWith({ title: movieTitle });
      expect(result).toBeUndefined();
    });

     it('should return an error if an error ocurrs', async () => {
      const movieTitle = 'Non Existent Movie';
      movieRepositoryMockInstance.findAll.mockRejectedValue(new Error());

      try {
        await getMovieByTitle.find(movieTitle);
      } catch (e) {
        expect(e).toStrictEqual(new Error())
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
