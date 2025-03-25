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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const shared_module_1 = require("../../shared/shared.module");
const movie_1 = require("./domain/entities/movie");
const movie_schema_1 = require("./infraestructure/persistance/repositories/mongodb/schema/movie.schema");
const external_stars_wars_service_1 = require("./infraestructure/external/external-stars-wars.service");
const providers_1 = require("./infraestructure/providers");
const movie_repository_1 = require("./infraestructure/persistance/repositories/mongodb/movie.repository");
const movie_resolver_1 = require("./infraestructure/interface/graphql/movie.resolver");
const jwt_1 = require("@nestjs/jwt");
let MoviesModule = class MoviesModule {
    movieService;
    constructor(movieService) {
        this.movieService = movieService;
    }
    async onModuleInit() {
        this.movieService.startRecurringMovieSeeding();
    }
};
exports.MoviesModule = MoviesModule;
exports.MoviesModule = MoviesModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_module_1.SharedModule, config_1.ConfigModule, mongoose_1.MongooseModule.forFeature([{ name: movie_1.Movie.name, schema: movie_schema_1.MovieSchema }])],
        providers: [jwt_1.JwtService, ...providers_1.providers, movie_repository_1.MovieRepository, movie_resolver_1.MovieResolver],
        exports: [external_stars_wars_service_1.ExternalStarWarsService],
    }),
    __metadata("design:paramtypes", [external_stars_wars_service_1.ExternalStarWarsService])
], MoviesModule);
//# sourceMappingURL=movies.module.js.map