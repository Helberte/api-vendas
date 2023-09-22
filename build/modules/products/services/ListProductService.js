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
const RedisCache_1 = __importDefault(require("src/shared/cache/RedisCache"));
class ListProductService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const productRepository = (0, typeorm_1.getCustomRepository)(ProductsRepository_1.ProductRepository);
            const redisCache = new RedisCache_1.default();
            // procura no cache o equivalente à chave infomada
            let products = yield redisCache.recover('api-vendas-PRODUCT_LIST');
            // verifica se a informação está em cache, se não tiver, busca no banco e salva o cache
            if (!products) {
                products = yield productRepository.find();
                yield redisCache.save('api-vendas-PRODUCT_LIST', products);
            }
            return products;
        });
    }
}
exports.default = ListProductService;
