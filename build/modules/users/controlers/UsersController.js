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
const ListUserService_1 = __importDefault(require("../services/ListUserService"));
const CreateUserService_1 = __importDefault(require("../services/CreateUserService"));
const class_transformer_1 = require("class-transformer");
class UsersController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listUsers = new ListUserService_1.default();
            const users = yield listUsers.execute();
            return response.json({ usuarios: (0, class_transformer_1.instanceToInstance)(users) });
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = request.body;
            const createUser = new CreateUserService_1.default();
            const user = yield createUser.execute({
                name: name.toUpperCase(),
                email,
                password
            });
            return response.json({ usuario: (0, class_transformer_1.instanceToInstance)(user) });
        });
    }
}
exports.default = UsersController;
