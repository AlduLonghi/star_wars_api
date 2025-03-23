"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./infrastructure/persitance/repositories/mongodb/schemas/user.schema");
const user_repository_1 = require("./infrastructure/persitance/repositories/mongodb/user.repository");
const Users_resolver_1 = require("./infrastructure/interface/graphql/Users.resolver");
const GetUser_1 = require("./application/use-cases/GetUser");
const user_1 = require("./domain/entities/user");
const providers_1 = require("./infrastructure/providers");
const GetUserByEmail_1 = require("./application/use-cases/GetUserByEmail");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_1.User.name, schema: user_schema_1.UserSchema }])],
        providers: [user_repository_1.UserRepository, Users_resolver_1.UsersResolver, ...providers_1.usersProviders],
        exports: [GetUser_1.GetUserUseCase, GetUserByEmail_1.GetUserByEmailUseCase],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map