import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from 'src/shared/shared.module';
import { Movie } from './domain/entities/movie';
import { MovieSchema } from './infraestructure/persistance/repositories/mongodb/schema/movie.schema';
import { ExternalStarWarsService } from './infraestructure/external/external-stars-wars.service';
import { providers } from './infraestructure/providers';
import { MovieRepository } from './infraestructure/persistance/repositories/mongodb/movie.repository';
import { MovieResolver } from './infraestructure/interface/graphql/movie.resolver';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SharedModule, ConfigModule, MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])],
  providers: [JwtService, ...providers, MovieRepository, MovieResolver],
  exports: [ExternalStarWarsService],
})

export class MoviesModule implements OnModuleInit {
  constructor(private readonly movieService: ExternalStarWarsService) {}

  async onModuleInit() {
    this.movieService.startRecurringMovieSeeding();
  }
}