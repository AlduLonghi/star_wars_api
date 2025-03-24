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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const Register_1 = require("../../../application/use-cases/Register");
const GetUser_1 = require("../../../application/use-cases/GetUser");
const UpdateUser_1 = require("../../../application/use-cases/UpdateUser");
const dtos_1 = require("./dtos");
const auth_guard_1 = require("../../../../../shared/infrastructure/interface/graphql/guards/auth.guard");
const roles_guard_1 = require("../../../../../shared/infrastructure/interface/graphql/guards/roles.guard");
const roles_decorator_1 = require("./decorators/roles.decorator");
let UsersResolver = class UsersResolver {
    registerUseCase;
    getUserUseCase;
    updateUserUseCase;
    constructor(registerUseCase, getUserUseCase, updateUserUseCase) {
        this.registerUseCase = registerUseCase;
        this.getUserUseCase = getUserUseCase;
        this.updateUserUseCase = updateUserUseCase;
    }
    async register(registerData) {
        return this.registerUseCase.execute(registerData);
    }
    async getUser(id) {
        return this.getUserUseCase.execute(id);
    }
    async updateUser(id, updateData) {
        return this.updateUserUseCase.execute(id, updateData);
    }
};
exports.UsersResolver = UsersResolver;
__decorate([
    (0, graphql_1.Mutation)(() => dtos_1.UserDto),
    __param(0, (0, graphql_1.Args)('registerData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Query)(() => dtos_1.UserDto),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => dtos_1.UserDto),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('USER', 'ADMIN'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('updateData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [Register_1.RegisterUseCase,
        GetUser_1.GetUserUseCase,
        UpdateUser_1.UpdateUserUseCase])
], UsersResolver);
//# sourceMappingURL=user.resolver.js.map