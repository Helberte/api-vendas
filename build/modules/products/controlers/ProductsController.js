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
const ListProductService_1 = __importDefault(require("../services/ListProductService"));
const ShowProductService_1 = __importDefault(require("../services/ShowProductService"));
const CreateProductService_1 = __importDefault(require("../services/CreateProductService"));
const AppError_1 = __importDefault(require("src/shared/errors/AppError"));
const UpdateProductService_1 = __importDefault(require("../services/UpdateProductService"));
const DeleteProductservice_1 = __importDefault(require("../services/DeleteProductservice"));
class ProductsController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listProducts = new ListProductService_1.default();
            const products = yield listProducts.execute();
            return response.json(products);
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const showProducts = new ShowProductService_1.default();
            const product = yield showProducts.execute({ id });
            return response.json(product);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, quantity } = request.body;
            if (typeof price !== "number")
                throw new AppError_1.default('O parameto price aceita somente numeros.');
            if (typeof quantity !== "number")
                throw new AppError_1.default('O parameto quantity aceita somente numeros.');
            const createProduct = new CreateProductService_1.default();
            const product = yield createProduct.execute({ name, price, quantity });
            return response.json(product);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, quantity } = request.body;
            const { id } = request.params;
            if (typeof price !== "number")
                throw new AppError_1.default('O parameto price aceita somente numeros.');
            if (typeof quantity !== "number")
                throw new AppError_1.default('O parameto quantity aceita somente numeros.');
            const updateProduct = new UpdateProductService_1.default();
            const product = yield updateProduct.execute({ id, name, price, quantity });
            return response.json(product);
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const deleteProduct = new DeleteProductservice_1.default();
            yield deleteProduct.execute({ id });
            return response.json([]);
        });
    }
}
exports.default = ProductsController;
