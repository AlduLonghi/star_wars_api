import { Test, TestingModule } from '@nestjs/testing';
import { MovieRepositoryPort } from '../../domain/ports';
import { jest } from '@jest/globals';
import { UpdateMovie } from './UpdateMovie';
import { MovieRepositoryMock } from '../../infraestructure/persistance/repositories/mongodb/movie.repository.mock';
import { MockMovie } from '../../domain/entities/movie.mock';

describe('UpdateMovie', () => {
  let updateMovie: UpdateMovie;
  let movieRepositoryMockInstance: MovieRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRepositoryMock,
        {
          provide: UpdateMovie,
          useFactory: (movieRepository: MovieRepositoryPort) => {
            return new UpdateMovie(movieRepository);
          },
          inject: [MovieRepositoryMock],
        },
      ],
    }).compile();

    updateMovie = module.get<UpdateMovie>(UpdateMovie);
    movieRepositoryMockInstance = module.get<MovieRepositoryMock>(MovieRepositoryMock);
  });

  it('should be defined', () => {
    expect(updateMovie).toBeDefined();
  });

  describe('update', () => {
    it('should update and return the updated movie', async () => {
      const updatedMovie = { ...MockMovie, title: 'Updated Title' };
      movieRepositoryMockInstance.update.mockResolvedValue(updatedMovie);

      const result = await updateMovie.update('12345', { title: 'Updated Title' });

      expect(movieRepositoryMockInstance.update).toHaveBeenCalledWith('12345', { title: 'Updated Title' });
      expect(result).toEqual(updatedMovie);
    });

    it('should return an error if update fails', async () => {
      movieRepositoryMockInstance.update.mockRejectedValue(new Error('Database error'));

      await expect(updateMovie.update('12345', { title: 'Updated Title' })).rejects.toThrow('Database error');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
