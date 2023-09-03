"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppError_1 = __importDefault(require("src/shared/errors/AppError"));
const UsersRepository_1 = require("../typeorm/repositories/UsersRepository");
const UsersTokensRepository_1 = require("../typeorm/repositories/UsersTokensRepository");
const date_fns_1 = require("date-fns");
const bcryptjs_1 = require("bcryptjs");
class ResetPasswordService {
    execute({ token, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepositoy = (0, typeorm_1.getCustomRepository)(UsersRepository_1.UsersRepository);
            const userTokensRepository = (0, typeorm_1.getCustomRepository)(UsersTokensRepository_1.UsersTokensRepository);
            const userToken = yield userTokensRepository.findByToken(token);
            if (!userToken)
                throw new AppError_1.default('Token do usuário não existe.');
            const user = yield userRepositoy.findById(userToken.user_id);
            if (!user)
                throw new AppError_1.default('Usuário não existe.');
            const tokenCreatedAt = userToken.created_at;
            const compareDate = (0, date_fns_1.addHours)(tokenCreatedAt, 2); // adiciona 2 horas
            if ((0, date_fns_1.isAfter)(Date.now(), compareDate))
                throw new AppError_1.default('Token expirado.');
            user.password = yield (0, bcryptjs_1.hash)(password, 8);
        });
    }
}
exports.default = ResetPasswordService;
