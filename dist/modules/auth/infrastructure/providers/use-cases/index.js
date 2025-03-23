"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProviders = void 0;
const jwt_1 = require("@nestjs/jwt");
const Login_1 = require("../../../application/use-cases/Login");
const GetUserByEmail_1 = require("../../../../users/application/use-cases/GetUserByEmail");
exports.authProviders = [
    {
        provide: Login_1.LoginUseCase,
        useFactory: (getUserByEmail, jwtService) => {
            return new Login_1.LoginUseCase(getUserByEmail, jwtService);
        },
        inject: [GetUserByEmail_1.GetUserByEmailUseCase, jwt_1.JwtService],
    },
];
//# sourceMappingURL=index.js.map