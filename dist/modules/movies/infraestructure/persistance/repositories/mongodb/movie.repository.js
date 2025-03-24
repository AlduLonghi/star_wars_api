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
exports.MovieRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const movie_1 = require("../../../../domain/entities/movie");
let MovieRepository = class MovieRepository {
    movieModel;
    constructor(movieModel) {
        this.movieModel = movieModel;
    }
    async create(movie) {
        try {
            const createdMovie = await this.movieModel.create(movie);
            return createdMovie;
        }
        catch {
            return null;
        }
    }
    async findById(id) {
        try {
            return await this.movieModel.findById(id).exec();
        }
        catch {
            return null;
        }
    }
    async findAll(filter = {}) {
        try {
            return await this.movieModel.find(filter).exec();
        }
        catch {
            return null;
        }
    }
    async update(id, movie) {
        try {
            return await this.movieModel.findByIdAndUpdate(id, movie, { new: true }).exec();
        }
        catch {
            return null;
        }
    }
};
exports.MovieRepository = MovieRepository;
exports.MovieRepository = MovieRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(movie_1.Movie.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MovieRepository);
//# sourceMappingURL=movie.repository.js.map