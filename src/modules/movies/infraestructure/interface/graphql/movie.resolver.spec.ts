import { Test, TestingModule } from '@nestjs/testing';
import { MovieResolver } from './movie.resolver';
import { CreateMoviePort } from '../../../domain/ports';
import { GetMovieByTitle } from '../../../application/use-cases/GetMovieByTitle';
import { GetMovies } from '../../../application/use-cases/GetMovies';
import { UpdateMovie } from '../../../application/use-cases/UpdateMovie';
import { CreateMovie } from '../../../application/use-cases/CreateMovie';
import { MovieInput, MovieUpdateInput } from './dtos';
import { MockMovie } from '../../../domain/entities/movie.mock';
import { RolesGuard } from '../../../../../shared/infrastructure/interface/graphql/guards/roles.guard';
import { GraphqlAuthGuard } from '../../../../../shared/infrastructure/interface/graphql/guards/auth.guard';
import { SharedModule } from '../../../../../shared/shared.module';
import { JwtService } from '@nestjs/jwt';

describe('MovieResolver', () => {
  let movieResolver: MovieResolver;
  let createMovieUseCase: CreateMoviePort;
  let getMovieByTitleUseCase: GetMovieByTitle;
  let getMoviesUseCase: GetMovies;
  let updateMovieUseCase: UpdateMovie;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SharedModule
      ],
      providers: [
        JwtService,
        GraphqlAuthGuard,
        RolesGuard,
        MovieResolver,
        {
          provide: CreateMovie,
          useValue: { create: jest.fn() },
        },
        {
          provide: GetMovieByTitle,
          useValue: { find: jest.fn() },
        },
        {
          provide: GetMovies,
          useValue: { find: jest.fn() },
        },
        {
          provide: UpdateMovie,
          useValue: { update: jest.fn() },
        },
      ],
    }).compile();

    movieResolver = module.get<MovieResolver>(MovieResolver);
    createMovieUseCase = module.get<CreateMovie>(CreateMovie);
    getMovieByTitleUseCase = module.get<GetMovieByTitle>(GetMovieByTitle);
    getMoviesUseCase = module.get<GetMovies>(GetMovies);
    updateMovieUseCase = module.get<UpdateMovie>(UpdateMovie);
  });

  it('should be defined', () => {
    expect(movieResolver).toBeDefined();
  });

  describe('createMovie', () => {
    it('should call createMovieUseCase.create and return a movie', async () => {
      jest.spyOn(createMovieUseCase, 'create').mockResolvedValue(MockMovie);

      const movieInput: MovieInput = {
          title: MockMovie.title,
          episode_id: 0,
          opening_crawl: '',
          director: '',
          producer: '',
          release_date: '',
          created: '',
          edited: '',
          url: ''
      };
      const result = await movieResolver.createMovie(movieInput);

      expect(createMovieUseCase.create).toHaveBeenCalledWith(movieInput);
      expect(result).toEqual(MockMovie);
    });
  });

  describe('getMovieByTitle', () => {
    it('should call getMovieByTitleUseCase.find and return a movie', async () => {
      jest.spyOn(getMovieByTitleUseCase, 'find').mockResolvedValue(MockMovie);

      const result = await movieResolver.getMovieByTitle(MockMovie.title);

      expect(getMovieByTitleUseCase.find).toHaveBeenCalledWith(MockMovie.title);
      expect(result).toEqual(MockMovie);
    });
  });

  describe('getMovies', () => {
    it('should call getMoviesUseCase.find and return a list of movies', async () => {
      jest.spyOn(getMoviesUseCase, 'find').mockResolvedValue([MockMovie]);

      const result = await movieResolver.getMovies();

      expect(getMoviesUseCase.find).toHaveBeenCalled();
      expect(result).toEqual([MockMovie]);
    });
  });

  describe('updateMovie', () => {
    it('should call updateMovieUseCase.update and return an updated movie', async () => {
      jest.spyOn(updateMovieUseCase, 'update').mockResolvedValue(MockMovie);

      const movieUpdateInput: MovieUpdateInput = { title: 'Updated Title' };
      const result = await movieResolver.updateMovie('12344', movieUpdateInput);

      expect(updateMovieUseCase.update).toHaveBeenCalledWith('12344', movieUpdateInput);
      expect(result).toEqual(MockMovie);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
