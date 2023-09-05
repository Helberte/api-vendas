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
const nodemailer_1 = __importDefault(require("nodemailer"));
class EtherealMail {
    static sendMail({ to, body, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield nodemailer_1.default.createTestAccount();
            const transporter = nodemailer_1.default.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            const message = yield transporter.sendMail({
                from: 'equipe@apivendas.com.br',
                to,
                subject: 'Hello ✔ recuperação de senha',
                text: body
            });
            console.log('messagem sent: %s', message.messageId);
            console.log('Preview url %s', nodemailer_1.default.getTestMessageUrl(message));
        });
    }
}
exports.default = EtherealMail;
