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
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const CustomersRepository_1 = require("../typeorm/repositories/CustomersRepository");
class DeleteCustomersService {
    execute({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const customersRepositoy = (0, typeorm_1.getCustomRepository)(CustomersRepository_1.CustomersRepository);
            const customer = yield customersRepositoy.findById(id);
            if (!customer)
                throw new AppError_1.default('Usuário não existe.');
            yield customersRepositoy.remove(customer);
            return 'Usuário removido com sucesso!';
        });
    }
}
exports.default = DeleteCustomersService;
