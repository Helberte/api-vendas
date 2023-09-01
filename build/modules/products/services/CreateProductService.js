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
const ProductsRepository_1 = require("../typeorm/repositories/ProductsRepository");
const AppError_1 = __importDefault(require("src/shared/errors/AppError"));
class CreateProductService {
    execute({ name, price, quantity }) {
        return __awaiter(this, void 0, void 0, function* () {
            const productsRepositoy = (0, typeorm_1.getCustomRepository)(ProductsRepository_1.ProductRepository);
            const productExists = yield productsRepositoy.findByName(name);
            if (productExists)
                throw new AppError_1.default('Já existe um produto com este nome.');
            const product = productsRepositoy.create({
                name,
                price,
                quantity,
            });
            yield productsRepositoy.save(product);
            return product;
        });
    }
}
exports.default = CreateProductService;