"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_guard_1 = require("./infrastructure/interface/graphql/guards/auth.guard");
const roles_guard_1 = require("./infrastructure/interface/graphql/guards/roles.guard");
const roles_decorator_1 = require("./infrastructure/interface/graphql/decorators/roles.decorator");
let SharedModule = class SharedModule {
};
exports.SharedModule = SharedModule;
exports.SharedModule = SharedModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [jwt_1.JwtService, auth_guard_1.AuthGuard, roles_guard_1.RolesGuard, roles_decorator_1.Roles],
        exports: [auth_guard_1.AuthGuard, roles_guard_1.RolesGuard, roles_decorator_1.Roles],
    })
], SharedModule);
//# sourceMappingURL=shared.module.js.map