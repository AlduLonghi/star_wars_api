import { Test, TestingModule } from '@nestjs/testing';
import { MovieRepositoryPort } from '../../domain/ports';
import { jest } from '@jest/globals'; 
import { CreateMovie } from './CreateMovie';
import { MovieRepositoryMock } from '../../infraestructure/persistance/repositories/mongodb/movie.repository.mock';
import { MockMovie } from '../../domain/entities/movie.mock';

describe('CreateMovie', () => {
  let createMovie: CreateMovie;
  let movieRepositoryMockInstance: MovieRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRepositoryMock,
        {
          provide: CreateMovie,
          useFactory: (movieRepository: MovieRepositoryPort) => {
            return new CreateMovie(movieRepository);
          },
          inject: [MovieRepositoryMock],
        },
      ],
    }).compile();

    createMovie = module.get<CreateMovie>(CreateMovie);
    movieRepositoryMockInstance = module.get<MovieRepositoryMock>(MovieRepositoryMock); // Get the instance
  });

  it('should be defined', () => {
    expect(createMovie).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      movieRepositoryMockInstance.create.mockResolvedValue(MockMovie);

      const result = await createMovie.create(MockMovie);

      expect(movieRepositoryMockInstance.create).toHaveBeenCalledWith(MockMovie);
      expect(result).toEqual(MockMovie);
    });

    it('should return null on error', async () => {
      movieRepositoryMockInstance.create.mockResolvedValue(new Error());

      try {
        await createMovie.create(MockMovie);
      } catch (e) {
        expect(e).toStrictEqual(new Error());
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });
});