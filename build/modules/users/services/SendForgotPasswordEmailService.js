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
const EtherealMail_1 = __importDefault(require("src/config/mail/EtherealMail"));
const path_1 = __importDefault(require("path"));
class SendForgotPasswordEmailService {
    execute({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepositoy = (0, typeorm_1.getCustomRepository)(UsersRepository_1.UsersRepository);
            const userTokensRepository = (0, typeorm_1.getCustomRepository)(UsersTokensRepository_1.UsersTokensRepository);
            const user = yield userRepositoy.findByEmail(email);
            if (!user)
                throw new AppError_1.default('Email do usuário não encontrado na base.');
            const userToken = yield userTokensRepository.generate(user.id);
            const forgotPasswordTemplate = path_1.default.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
            yield EtherealMail_1.default.sendMail({
                to: {
                    name: user.name,
                    email: user.email
                },
                subject: '[API Vendas] Recuperação de senha.',
                templateData: {
                    file: forgotPasswordTemplate,
                    variables: {
                        name: user.name,
                        link: `${process.env.APP_WEB_URL}/reset_password?token=${userToken.token}`
                    }
                },
            });
        });
    }
}
exports.default = SendForgotPasswordEmailService;
