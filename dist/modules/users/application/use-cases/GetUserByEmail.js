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
exports.GetUserByEmailUseCase = void 0;
const common_1 = require("@nestjs/common");
let GetUserByEmailUseCase = class GetUserByEmailUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(email) {
        return this.userRepository.findByEmail(email);
    }
};
exports.GetUserByEmailUseCase = GetUserByEmailUseCase;
exports.GetUserByEmailUseCase = GetUserByEmailUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], GetUserByEmailUseCase);
//# sourceMappingURL=GetUserByEmail.js.map