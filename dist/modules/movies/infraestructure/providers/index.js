"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providers = void 0;
const external_stars_wars_service_1 = require("../external/external-stars-wars.service");
const movie_repository_1 = require("../persistance/repositories/mongodb/movie.repository");
const CreateMovie_1 = require("../../application/use-cases/CreateMovie");
const GetMovieByTitle_1 = require("../../application/use-cases/GetMovieByTitle");
const GetMovies_1 = require("../../application/use-cases/GetMovies");
const UpdateMovie_1 = require("../../application/use-cases/UpdateMovie");
exports.providers = [
    {
        provide: external_stars_wars_service_1.ExternalStarWarsService,
        useFactory: (movieRepository) => {
            return new external_stars_wars_service_1.ExternalStarWarsService(movieRepository);
        },
        inject: [movie_repository_1.MovieRepository],
    },
    {
        provide: CreateMovie_1.CreateMovie,
        useFactory: (movieRepository) => {
            return new CreateMovie_1.CreateMovie(movieRepository);
        },
        inject: [movie_repository_1.MovieRepository],
    },
    {
        provide: GetMovieByTitle_1.GetMovieByTitle,
        useFactory: (movieRepository) => {
            return new GetMovieByTitle_1.GetMovieByTitle(movieRepository);
        },
        inject: [movie_repository_1.MovieRepository],
    },
    {
        provide: GetMovies_1.GetMovies,
        useFactory: (movieRepository) => {
            return new GetMovies_1.GetMovies(movieRepository);
        },
        inject: [movie_repository_1.MovieRepository],
    },
    {
        provide: UpdateMovie_1.UpdateMovie,
        useFactory: (movieRepository) => {
            return new UpdateMovie_1.UpdateMovie(movieRepository);
        },
        inject: [movie_repository_1.MovieRepository],
    },
];
//# sourceMappingURL=index.js.map