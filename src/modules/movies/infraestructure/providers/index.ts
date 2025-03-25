import { Provider } from "@nestjs/common";
import { ExternalStarWarsService } from "../external/external-stars-wars.service";
import { MovieRepository } from "../persistance/repositories/mongodb/movie.repository";
import { MovieRepositoryPort } from "src/modules/movies/domain/ports";
import { CreateMovie } from "../../application/use-cases/CreateMovie";
import { GetMovieByTitle } from "../../application/use-cases/GetMovieByTitle";
import { GetMovies } from "../../application/use-cases/GetMovies";
import { UpdateMovie } from "../../application/use-cases/UpdateMovie";

export const providers: Provider[] = [
  {
    provide: ExternalStarWarsService,
    useFactory: (movieRepository: MovieRepositoryPort) => {
      return new ExternalStarWarsService(movieRepository); 
    },
    inject: [MovieRepository], 
  },
  {
    provide: CreateMovie,
    useFactory: (movieRepository: MovieRepositoryPort) => {
      return new CreateMovie(movieRepository); 
    },
    inject: [MovieRepository], 
  },
  {
    provide: GetMovieByTitle,
    useFactory: (movieRepository: MovieRepositoryPort) => {
      return new GetMovieByTitle(movieRepository); 
    },
    inject: [MovieRepository], 
  },
  {
    provide: GetMovies,
    useFactory: (movieRepository: MovieRepositoryPort) => {
      return new GetMovies(movieRepository); 
    },
    inject: [MovieRepository], 
  },
  {
    provide: UpdateMovie,
    useFactory: (movieRepository: MovieRepositoryPort) => {
      return new UpdateMovie(movieRepository); 
    },
    inject: [MovieRepository], 
  },
];