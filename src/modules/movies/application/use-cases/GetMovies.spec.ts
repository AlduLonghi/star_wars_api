import { Test, TestingModule } from '@nestjs/testing';
import { MovieRepositoryPort } from '../../domain/ports';
import { jest } from '@jest/globals';
import { GetMovies } from './GetMovies';
import { MovieRepositoryMock } from '../../infraestructure/persistance/repositories/mongodb/movie.repository.mock';
import { MockMovie } from '../../domain/entities/movie.mock';

describe('GetMovies', () => {
  let getMovies: GetMovies;
  let movieRepositoryMockInstance: MovieRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRepositoryMock,
        {
          provide: GetMovies,
          useFactory: (movieRepository: MovieRepositoryPort) => {
            return new GetMovies(movieRepository);
          },
          inject: [MovieRepositoryMock],
        },
      ],
    }).compile();

    getMovies = module.get<GetMovies>(GetMovies);
    movieRepositoryMockInstance = module.get<MovieRepositoryMock>(MovieRepositoryMock);
  });

  it('should be defined', () => {
    expect(getMovies).toBeDefined();
  });

  describe('find', () => {
    it('should return a list of movies', async () => {
      movieRepositoryMockInstance.findAll.mockResolvedValue([MockMovie]);

      const result = await getMovies.find();

      expect(movieRepositoryMockInstance.findAll).toHaveBeenCalled();
      expect(result).toEqual([MockMovie]);
    });

    it('should return an empty array if no movies are found', async () => {
      movieRepositoryMockInstance.findAll.mockResolvedValue([]);

      const result = await getMovies.find();

      expect(movieRepositoryMockInstance.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should throw an error if an error occurs', async () => {
      movieRepositoryMockInstance.findAll.mockRejectedValue(new Error('Database error'));

      await expect(getMovies.find()).rejects.toThrow('Database error');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
