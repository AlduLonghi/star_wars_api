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
exports.UpdateUserInput = exports.UserDto = exports.RegisterDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let RegisterDto = class RegisterDto {
    name;
    email;
    password;
    role;
};
exports.RegisterDto = RegisterDto;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);
exports.RegisterDto = RegisterDto = __decorate([
    (0, graphql_1.InputType)()
], RegisterDto);
let UserDto = class UserDto {
    id;
    email;
    role;
};
exports.UserDto = UserDto;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
exports.UserDto = UserDto = __decorate([
    (0, graphql_1.ObjectType)()
], UserDto);
let UpdateUserInput = class UpdateUserInput {
    name;
    email;
    password;
};
exports.UpdateUserInput = UpdateUserInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "password", void 0);
exports.UpdateUserInput = UpdateUserInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateUserInput);
//# sourceMappingURL=index.js.map