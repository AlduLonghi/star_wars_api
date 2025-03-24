import { Provider } from "@nestjs/common";
import { ExternalStarWarsSeeder } from "../../external/stars-wars.api";
import { MovieRepository } from "../../persistance/repositories/mongodb/movie.repository";
import { MovieRepositoryPort } from "src/modules/movies/domain/ports";

export const externalStarWarsSeederProvider: Provider[] = [
  {
    provide: ExternalStarWarsSeeder,
    useFactory: (movieRepository: MovieRepositoryPort) => {
      return new ExternalStarWarsSeeder(movieRepository); 
    },
    inject: [MovieRepository], 
  },
];