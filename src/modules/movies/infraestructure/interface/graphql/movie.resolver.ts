import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateMovie } from 'src/modules/movies/application/use-cases/CreateMovie';
import { GetMovieByTitle } from 'src/modules/movies/application/use-cases/GetMovieByTitle';
import { GetMovies } from 'src/modules/movies/application/use-cases/GetMovies';
import { UpdateMovie } from 'src/modules/movies/application/use-cases/UpdateMovie';
import { Movie } from 'src/modules/movies/domain/entities/movie';
import { MovieInput, MovieOutput, MovieUpdateInput } from './dtos';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/shared/infrastructure/interface/graphql/guards/roles.guard';
import { Roles } from '../../../../../shared/infrastructure/interface/graphql/decorators/roles.decorator';
import { AuthGuard } from 'src/shared/infrastructure/interface/graphql/guards/auth.guard';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(
    private readonly createMovieUseCase: CreateMovie,
    private readonly getMovieByTitleUseCase: GetMovieByTitle,
    private readonly getMoviesUseCase: GetMovies,
    private readonly updateMovieUseCase: UpdateMovie,
  ) {}

  @Mutation(() => MovieOutput, { nullable: true })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles.setRoles('ADMIN')
  async createMovie(@Args('movie') movie: MovieInput) {
    return this.createMovieUseCase.create(movie);
  }

  @Query(() => MovieOutput, { nullable: true })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles.setRoles('USER')
  async getMovieByTitle(@Args('title') title: string) {
    return this.getMovieByTitleUseCase.find(title);
  }

  @Query(() => [MovieOutput], { nullable: true })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles.setRoles('ADMIN', 'USER')
  async getMovies() {
    return this.getMoviesUseCase.find();
  }

  @Mutation(() => MovieOutput, { nullable: true })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles.setRoles('ADMIN')
  async updateMovie(
    @Args('id') id: string,
    @Args('movie') movie: MovieUpdateInput,
  ) {
    return this.updateMovieUseCase.update(id, movie);
  }
}
