"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ExternalStarWarsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalStarWarsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let ExternalStarWarsService = ExternalStarWarsService_1 = class ExternalStarWarsService {
    movieRepository;
    logger = new common_1.Logger(ExternalStarWarsService_1.name);
    starWarsApiUrl = 'https://swapi.dev/api/films/';
    SEED_INTERVAL = 5 * 60 * 1000;
    seedInterval;
    constructor(movieRepository) {
        this.movieRepository = movieRepository;
    }
    async fetchMoviesFromApi() {
        try {
            const response = await axios_1.default.get(this.starWarsApiUrl);
            return response.data.results;
        }
        catch (error) {
            this.logger.error('Failed to fetch movies from the Star Wars API', error);
            throw new Error('Failed to fetch movies from the Star Wars API');
        }
    }
    async saveMoviesToDatabase(movies) {
        try {
            for (const movie of movies) {
                const existingMovies = await this.movieRepository.findAll({ episode_id: movie.episode_id });
                const existingMovie = existingMovies && existingMovies[0];
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
        }
        catch (error) {
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
};
exports.ExternalStarWarsService = ExternalStarWarsService;
exports.ExternalStarWarsService = ExternalStarWarsService = ExternalStarWarsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], ExternalStarWarsService);
//# sourceMappingURL=external-stars-wars.service.js.map