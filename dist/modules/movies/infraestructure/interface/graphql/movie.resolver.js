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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const CreateMovie_1 = require("../../../application/use-cases/CreateMovie");
const GetMovieByTitle_1 = require("../../../application/use-cases/GetMovieByTitle");
const GetMovies_1 = require("../../../application/use-cases/GetMovies");
const UpdateMovie_1 = require("../../../application/use-cases/UpdateMovie");
const movie_1 = require("../../../domain/entities/movie");
const dtos_1 = require("./dtos");
const common_1 = require("@nestjs/common");
const roles_guard_1 = require("../../../../../shared/infrastructure/interface/graphql/guards/roles.guard");
const roles_decorator_1 = require("../../../../../shared/infrastructure/interface/graphql/decorators/roles.decorator");
const auth_guard_1 = require("../../../../../shared/infrastructure/interface/graphql/guards/auth.guard");
let MovieResolver = class MovieResolver {
    createMovieUseCase;
    getMovieByTitleUseCase;
    getMoviesUseCase;
    updateMovieUseCase;
    constructor(createMovieUseCase, getMovieByTitleUseCase, getMoviesUseCase, updateMovieUseCase) {
        this.createMovieUseCase = createMovieUseCase;
        this.getMovieByTitleUseCase = getMovieByTitleUseCase;
        this.getMoviesUseCase = getMoviesUseCase;
        this.updateMovieUseCase = updateMovieUseCase;
    }
    async createMovie(movie) {
        return this.createMovieUseCase.create(movie);
    }
    async getMovieByTitle(title) {
        return this.getMovieByTitleUseCase.find(title);
    }
    async getMovies() {
        return this.getMoviesUseCase.find();
    }
    async updateMovie(id, movie) {
        return this.updateMovieUseCase.update(id, movie);
    }
};
exports.MovieResolver = MovieResolver;
__decorate([
    (0, graphql_1.Mutation)(() => dtos_1.MovieOutput, { nullable: true }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    roles_decorator_1.Roles.setRoles('ADMIN'),
    __param(0, (0, graphql_1.Args)('movie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.MovieInput]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "createMovie", null);
__decorate([
    (0, graphql_1.Query)(() => dtos_1.MovieOutput, { nullable: true }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    roles_decorator_1.Roles.setRoles('USER'),
    __param(0, (0, graphql_1.Args)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "getMovieByTitle", null);
__decorate([
    (0, graphql_1.Query)(() => [dtos_1.MovieOutput], { nullable: true }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    roles_decorator_1.Roles.setRoles('ADMIN', 'USER'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "getMovies", null);
__decorate([
    (0, graphql_1.Mutation)(() => dtos_1.MovieOutput, { nullable: true }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    roles_decorator_1.Roles.setRoles('ADMIN'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('movie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.MovieUpdateInput]),
    __metadata("design:returntype", Promise)
], MovieResolver.prototype, "updateMovie", null);
exports.MovieResolver = MovieResolver = __decorate([
    (0, graphql_1.Resolver)(() => movie_1.Movie),
    __metadata("design:paramtypes", [CreateMovie_1.CreateMovie,
        GetMovieByTitle_1.GetMovieByTitle,
        GetMovies_1.GetMovies,
        UpdateMovie_1.UpdateMovie])
], MovieResolver);
//# sourceMappingURL=movie.resolver.js.map