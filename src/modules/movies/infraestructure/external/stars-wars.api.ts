/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import axios from 'axios';
import { MovieRepositoryPort } from '../../domain/ports';

@Injectable()
export class ExternalStarWarsSeeder implements OnModuleDestroy {
  private readonly logger = new Logger(ExternalStarWarsSeeder.name);
  private readonly starWarsApiUrl = 'https://swapi.dev/api/films/';
  private readonly SEED_INTERVAL = 5 * 60 * 1000; 
  private seedInterval: NodeJS.Timeout;

  constructor(private readonly movieRepository: MovieRepositoryPort) {}

  async fetchMoviesFromApi(): Promise<any> {
    try {
      const response = await axios.get(this.starWarsApiUrl);
      return response.data.results;
    } catch (error) {
      this.logger.error('Failed to fetch movies from the Star Wars API', error);
      throw new Error('Failed to fetch movies from the Star Wars API');
    }
  }

  async saveMoviesToDatabase(movies: any[]): Promise<void> {
    try {
      for (const movie of movies) {
       const existingMovie = await this.movieRepository.findAll({ episode_id: movie.episode_id})[0];

       if (!existingMovie) {
        const movieDoc = {
           title: movie.title,
           episode_id: movie.episode_id,
           opening_crawl: movie.opening_crawl,
           director: movie.director,
           producer: movie.producer,
           release_date: movie.release_date,
           characters: movie.characters, 
           planets: movie.planets, 
           starships: movie.starships, 
           vehicles: movie.vehicles, 
           species: movie.species, 
           created: movie.created,
           edited: movie.edited,
           url: movie.url,
        };

        await this.movieRepository.create(movieDoc);
       }
      }
      this.logger.log('Movies saved to the database successfully');
    } catch (error) {
      this.logger.error('Error saving movies to the database', error);
      throw new Error('Error saving movies to the database');
    }
  }

  async seedMoviesOnce() {
    const movies = await this.fetchMoviesFromApi();
    await this.saveMoviesToDatabase(movies);
  }

  startRecurringMovieSeeding() {
    this.seedMoviesOnce();

    this.seedInterval = setInterval(async () => {
      this.logger.log('Running movie seeding task...');
      await this.seedMoviesOnce();
    }, this.SEED_INTERVAL);
  }

  onModuleDestroy() {
    if (this.seedInterval) {
      clearInterval(this.seedInterval);
      this.logger.log('Seed interval cleared on shutdown');
    }
  }
}
