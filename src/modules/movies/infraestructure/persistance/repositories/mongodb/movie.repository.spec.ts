/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { MovieRepository } from './movie.repository';
import { Movie } from './schema/movie.schema';
import { MockMovie } from '../../../../domain/entities/movie.mock';

describe('MovieRepository', () => {
  let movieRepository: MovieRepository;
  let movieModel: Model<Movie>;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRepository,
        {
          provide: getModelToken(Movie.name),
          useValue: mongoose.model(Movie.name, new mongoose.Schema<Movie>({ title: String })),
        },
      ],
    }).compile();

    movieRepository = module.get<MovieRepository>(MovieRepository);
    movieModel = module.get<Model<Movie>>(getModelToken(Movie.name));
  });

  afterEach(async () => {
    await movieModel.deleteMany({});
    mongoose.deleteModel(Movie.name);
  });

  it('should be defined', () => {
    expect(movieRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const mockMovie = await movieModel.create(MockMovie);
      const result = await movieRepository.create(mockMovie);

      expect(result).toBeDefined();
      if (result instanceof Error) {
        fail('Expected a created movie but got an Error');
      }
      expect(result).toHaveProperty('_id');
      expect(result.title).toBe('Test Movie');
    });

    it('should return an error if creation fails', async () => {
      jest.spyOn(movieModel, 'create').mockRejectedValue(new Error('Database error'));
      const result = await movieRepository.create({ title: 'Fail Movie' } as Movie);
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('findById', () => {
    it('should return a movie by ID', async () => {
      const mockMovie = await movieModel.create({ title: 'The Matrix' });
      const result = await movieRepository.findById(mockMovie._id.toString());

      expect(result).toBeDefined();
      if (result instanceof Error) {
        fail('Expected a Movie but got an Error');
      }
      expect(result).toHaveProperty('_id');
      expect(result.title).toBe('The Matrix');
    });

    it('should return an error if movie not found', async () => {
      const result = await movieRepository.findById(new mongoose.Types.ObjectId().toString());
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('Entity not found');
    });
  });

  describe('findAll', () => {
    it('should return all movies', async () => {
      await movieModel.create({ title: 'Movie 1' });
      await movieModel.create({ title: 'Movie 2' });
      const result = await movieRepository.findAll();

      expect(result).toBeDefined();
      if (result instanceof Error) {
        fail('Expected an array of movies but got an Error');
      }
      expect(Array.isArray(result)).toBeTruthy();
    });

    it('should return an empty array if no movies exist', async () => {
      await movieModel.deleteMany({});
      const result = await movieRepository.findAll();

      expect(result).toBeDefined();
      if (result instanceof Error) {
        fail('Expected an empty array but got an Error');
      }
      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toBe(0);
    });

    it('should return an error if database fails', async () => {
      const mockQuery = {
        exec: jest.fn().mockRejectedValue(new Error('Database error')),
      };
      jest.spyOn(movieModel, 'find').mockReturnValue(mockQuery as any);
      try {
        await movieRepository.findAll();
      } catch (e) {
        expect(e).toStrictEqual(new Error('Database error'));
      }
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const mockMovie = await movieModel.create({ title: 'Original Title' });
      const updatedMovie = await movieRepository.update(mockMovie._id.toString(), { title: 'Updated Title' });

      expect(updatedMovie).toBeDefined();
      if (updatedMovie instanceof Error) {
        fail('Expected an updated movie but got an Error');
      }
      expect(updatedMovie.title).toBe('Updated Title');
    });

    it('should return an error if movie does not exist', async () => {
      const result = await movieRepository.update(new mongoose.Types.ObjectId().toString(), { title: 'New Title' });
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('Eror updating entity');
    });

    it('should return an error if update operation fails', async () => {
      const mockQuery = {
        exec: jest.fn().mockRejectedValue(new Error('Database error')),
      };
      jest.spyOn(movieModel, 'findByIdAndUpdate').mockReturnValue(mockQuery as any);
      const result = await movieRepository.update(new mongoose.Types.ObjectId().toString(), { title: 'New Title' });
      expect(result).toBeInstanceOf(Error);
    });
  });
});
