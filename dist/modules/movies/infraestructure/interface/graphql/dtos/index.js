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
exports.MovieUpdateInput = exports.MovieInput = exports.MovieOutput = void 0;
const graphql_1 = require("@nestjs/graphql");
let MovieOutput = class MovieOutput {
    _id;
    title;
    episode_id;
    opening_crawl;
    director;
    producer;
    release_date;
    characters;
    planets;
    starships;
    vehicles;
    species;
    created;
    edited;
    url;
};
exports.MovieOutput = MovieOutput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], MovieOutput.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieOutput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], MovieOutput.prototype, "episode_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieOutput.prototype, "opening_crawl", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieOutput.prototype, "director", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieOutput.prototype, "producer", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieOutput.prototype, "release_date", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], MovieOutput.prototype, "characters", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], MovieOutput.prototype, "planets", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], MovieOutput.prototype, "starships", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], MovieOutput.prototype, "vehicles", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], MovieOutput.prototype, "species", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieOutput.prototype, "created", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieOutput.prototype, "edited", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieOutput.prototype, "url", void 0);
exports.MovieOutput = MovieOutput = __decorate([
    (0, graphql_1.ObjectType)()
], MovieOutput);
let MovieInput = class MovieInput {
    title;
    episode_id;
    opening_crawl;
    director;
    producer;
    release_date;
    characters;
    planets;
    starships;
    vehicles;
    species;
    created;
    edited;
    url;
};
exports.MovieInput = MovieInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], MovieInput.prototype, "episode_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieInput.prototype, "opening_crawl", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieInput.prototype, "director", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieInput.prototype, "producer", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieInput.prototype, "release_date", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], MovieInput.prototype, "characters", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], MovieInput.prototype, "planets", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], MovieInput.prototype, "starships", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], MovieInput.prototype, "vehicles", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], MovieInput.prototype, "species", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieInput.prototype, "created", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieInput.prototype, "edited", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MovieInput.prototype, "url", void 0);
exports.MovieInput = MovieInput = __decorate([
    (0, graphql_1.InputType)()
], MovieInput);
let MovieUpdateInput = class MovieUpdateInput {
    title;
    episode_id;
    opening_crawl;
    director;
    producer;
    release_date;
    characters;
    planets;
    starships;
    vehicles;
    species;
    created;
    edited;
    url;
};
exports.MovieUpdateInput = MovieUpdateInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MovieUpdateInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Number)
], MovieUpdateInput.prototype, "episode_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MovieUpdateInput.prototype, "opening_crawl", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MovieUpdateInput.prototype, "director", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MovieUpdateInput.prototype, "producer", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MovieUpdateInput.prototype, "release_date", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], MovieUpdateInput.prototype, "characters", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], MovieUpdateInput.prototype, "planets", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], MovieUpdateInput.prototype, "starships", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], MovieUpdateInput.prototype, "vehicles", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], MovieUpdateInput.prototype, "species", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MovieUpdateInput.prototype, "created", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MovieUpdateInput.prototype, "edited", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], MovieUpdateInput.prototype, "url", void 0);
exports.MovieUpdateInput = MovieUpdateInput = __decorate([
    (0, graphql_1.InputType)()
], MovieUpdateInput);
//# sourceMappingURL=index.js.map