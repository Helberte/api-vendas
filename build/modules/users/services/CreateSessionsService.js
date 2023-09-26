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
const UsersRepository_1 = require("../typeorm/repositories/UsersRepository");
const AppError_1 = __importDefault(require("src/shared/errors/AppError"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("src/config/auth"));
class CreateSessionsService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepositoy = (0, typeorm_1.getCustomRepository)(UsersRepository_1.UsersRepository);
            const userEmail = yield userRepositoy.findByEmail(email);
            if (!userEmail)
                throw new AppError_1.default('Dados incorretos: Email/Senha.', 401);
            // compara a senha cadastrada e retorna se tem ou não acesso
            const passwordConfirmed = yield (0, bcryptjs_1.compare)(password, userEmail.password);
            if (!passwordConfirmed)
                throw new AppError_1.default('Dados incorretos: Email/Senha..', 401);
            // este metodo cria o token com base neste segundo parametro, ele meio que assina o token com base neste
            const token = (0, jsonwebtoken_1.sign)({}, "ac2b7893067c581dc0f4f3b6e0441d95", {
                subject: userEmail.id,
                expiresIn: auth_1.default.jwt.expiresIn
            });
            return {
                usuario: userEmail,
                token: token
            };
        });
    }
}
exports.default = CreateSessionsService;
