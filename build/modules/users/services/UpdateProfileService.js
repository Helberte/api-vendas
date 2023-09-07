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
class UpdateProfileService {
    execute({ user_id, name, email, password, old_password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepositoy = (0, typeorm_1.getCustomRepository)(UsersRepository_1.UsersRepository);
            const user = yield userRepositoy.findById(user_id);
            const userCopy = user;
            if (!user)
                throw new AppError_1.default('Usuário não encontrado.');
            const userUpdateEmail = yield userRepositoy.findByEmail(email);
            if (userUpdateEmail && userUpdateEmail.id != user_id)
                throw new AppError_1.default('Email já está em uso.');
            const checkOldPassword = yield (0, bcryptjs_1.compare)(old_password, (userCopy === null || userCopy === void 0 ? void 0 : userCopy.password) || '');
            if (!checkOldPassword)
                throw new AppError_1.default('As senhas não coincidem.');
            if (userCopy) {
                userCopy.password = yield (0, bcryptjs_1.hash)(password, 8);
                userCopy.email = email;
                userCopy.name = name.toUpperCase();
                yield userRepositoy.save(userCopy);
            }
            return user;
        });
    }
}
exports.default = UpdateProfileService;
