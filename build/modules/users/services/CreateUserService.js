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
class CreateUserService {
    execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepositoy = (0, typeorm_1.getCustomRepository)(UsersRepository_1.UsersRepository);
            const emailUserExists = yield userRepositoy.findByEmail(email);
            if (emailUserExists)
                throw new AppError_1.default('Já existe um email igual a este cadastrado, tente outro.');
            const user = userRepositoy.create({
                name,
                email,
                password
            });
            yield userRepositoy.save(user);
            return user;
        });
    }
}
exports.default = CreateUserService;
