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
const ListCustomersService_1 = __importDefault(require("../services/ListCustomersService"));
const ShowCustomersService_1 = __importDefault(require("../services/ShowCustomersService"));
const CreateCustomersService_1 = __importDefault(require("../services/CreateCustomersService"));
const UpdateCustomerService_1 = __importDefault(require("../services/UpdateCustomerService"));
const DeleteCustomersService_1 = __importDefault(require("../services/DeleteCustomersService"));
class CustomersController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listCustomers = new ListCustomersService_1.default();
            const customers = yield listCustomers.execute();
            return response.json({ clientes: customers });
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const showCustomer = new ShowCustomersService_1.default();
            const customer = yield showCustomer.execute({ id });
            return response.json({ cliente: customer });
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = request.body;
            const createCustomer = new CreateCustomersService_1.default();
            const customer = yield createCustomer.execute({
                name: name.toUpperCase(),
                email
            });
            return response.json({ cliente: customer });
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = request.body;
            const { id } = request.params;
            const updateCustomer = new UpdateCustomerService_1.default();
            const customer = yield updateCustomer.execute({
                id: id,
                name: name.toUpperCase(),
                email
            });
            return response.json({ cliente: customer });
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const deleteCustomer = new DeleteCustomersService_1.default();
            yield deleteCustomer.execute({ id });
            return response.json({ mensagem: "Cliente deletado com sucesso." });
        });
    }
}
exports.default = CustomersController;
