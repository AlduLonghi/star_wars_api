"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalStarWarsSeederProvider = void 0;
const stars_wars_api_1 = require("../../external/stars-wars.api");
const movie_repository_1 = require("../../persistance/repositories/mongodb/movie.repository");
exports.externalStarWarsSeederProvider = [
    {
        provide: stars_wars_api_1.ExternalStarWarsSeeder,
        useFactory: (movieRepository) => {
            return new stars_wars_api_1.ExternalStarWarsSeeder(movieRepository);
        },
        inject: [movie_repository_1.MovieRepository],
    },
];
//# sourceMappingURL=index.js.map