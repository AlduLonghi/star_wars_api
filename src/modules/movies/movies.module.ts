import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from 'src/shared/shared.module';
import { Movie } from './domain/entities/movie';
import { MovieSchema } from './infraestructure/persistance/repositories/mongodb/schema/movie.schema';
import { ExternalStarWarsSeeder } from './infraestructure/external/stars-wars.api';
import { externalStarWarsSeederProvider } from './infraestructure/providers/external';
import { MovieRepository } from './infraestructure/persistance/repositories/mongodb/movie.repository';

@Module({
  imports: [SharedModule, ConfigModule, MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])],
  providers: [...externalStarWarsSeederProvider, MovieRepository],
  exports: [ExternalStarWarsSeeder],
})

export class MoviesModule implements OnModuleInit {
  constructor(private readonly movieService: ExternalStarWarsSeeder) {}

  async onModuleInit() {
    this.movieService.startRecurringMovieSeeding();
  }
}