"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = __importDefault(require("src/shared/errors/AppError"));
function isAuthenticated(request, response, next) {
    // pega o token que o usuário enviou no header da requisição
    const authHeader = request.headers.authorization;
    if (!authHeader)
        throw new AppError_1.default('Não existe um token.');
    // exemplo do formato:
    // Bearer 6541dee4wf1f8e741684g6esg4teg6t8g41t6g84rtg
    const [, token] = authHeader.split(' ');
    // saber se o tken foi o mesmo criado com o secret da aplicacao
    try {
        // caso não de erro é porque está autorizado
        const decodeToken = (0, jsonwebtoken_1.verify)(token, "ac2b7893067c581dc0f4f3b6e0441d95");
        const { sub } = decodeToken;
        request.user = {
            id: sub
        };
        return next();
    }
    catch (_a) {
        throw new AppError_1.default('Token JWT Inválido.');
    }
}
exports.default = isAuthenticated;
