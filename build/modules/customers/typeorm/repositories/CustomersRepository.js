"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.CustomersRepository = void 0;
const typeorm_1 = require("typeorm");
const Customers_1 = __importDefault(require("../entities/Customers"));
let CustomersRepository = class CustomersRepository extends typeorm_1.Repository {
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.findOne({
                where: {
                    name: name
                }
            });
            return customer;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.findOne({
                where: {
                    id: id
                }
            });
            return customer;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.findOne({
                where: {
                    email: email
                }
            });
            return customer;
        });
    }
};
exports.CustomersRepository = CustomersRepository;
exports.CustomersRepository = CustomersRepository = __decorate([
    (0, typeorm_1.EntityRepository)(Customers_1.default)
], CustomersRepository);