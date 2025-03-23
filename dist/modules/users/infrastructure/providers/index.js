"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersProviders = void 0;
const Register_1 = require("../../application/use-cases/Register");
const GetUser_1 = require("../../application/use-cases/GetUser");
const UpdateUser_1 = require("../../application/use-cases/UpdateUser");
const user_repository_1 = require("../persitance/repositories/mongodb/user.repository");
const GetUserByEmail_1 = require("../../application/use-cases/GetUserByEmail");
exports.usersProviders = [
    {
        provide: Register_1.RegisterUseCase,
        useFactory: (userRepository) => new Register_1.RegisterUseCase(userRepository),
        inject: [user_repository_1.UserRepository],
    },
    {
        provide: GetUser_1.GetUserUseCase,
        useFactory: (userRepository) => new GetUser_1.GetUserUseCase(userRepository),
        inject: [user_repository_1.UserRepository],
    },
    {
        provide: UpdateUser_1.UpdateUserUseCase,
        useFactory: (userRepository) => new UpdateUser_1.UpdateUserUseCase(userRepository),
        inject: [user_repository_1.UserRepository],
    },
    {
        provide: GetUserByEmail_1.GetUserByEmailUseCase,
        useFactory: (userRepository) => new UpdateUser_1.UpdateUserUseCase(userRepository),
        inject: [user_repository_1.UserRepository],
    },
];
//# sourceMappingURL=index.js.map