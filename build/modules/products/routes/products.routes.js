"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = __importDefault(require("../controlers/ProductsController"));
const productsRouter = (0, express_1.Router)();
const productsControler = new ProductsController_1.default();
productsRouter.get('/', productsControler.index);
productsRouter.get('/:id', productsControler.show);
productsRouter.post('/', productsControler.create);
productsRouter.put('/:id', productsControler.update);
productsRouter.delete('/:id', productsControler.delete);
exports.default = productsRouter;
