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
exports.LoginUseCase = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const GetUserByEmail_1 = require("../../../users/application/use-cases/GetUserByEmail");
let LoginUseCase = class LoginUseCase {
    getUserByEmail;
    jwtService;
    constructor(getUserByEmail, jwtService) {
        this.getUserByEmail = getUserByEmail;
        this.jwtService = jwtService;
    }
    async execute(email, password) {
        const user = await this.getUserByEmail.execute(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        return { accessToken: this.jwtService.sign(payload) };
    }
};
exports.LoginUseCase = LoginUseCase;
exports.LoginUseCase = LoginUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [GetUserByEmail_1.GetUserByEmailUseCase,
        jwt_1.JwtService])
], LoginUseCase);
//# sourceMappingURL=Login.js.map