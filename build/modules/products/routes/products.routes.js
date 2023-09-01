"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = __importDefault(require("../controlers/ProductsController"));
const celebrate_1 = require("celebrate");
'celebrate';
const productsRouter = (0, express_1.Router)();
const productsControler = new ProductsController_1.default();
// index
productsRouter.get('/', productsControler.index);
// show
productsRouter.get('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    }
}), productsControler.show);
// create
productsRouter.post('/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().precision(2).required(),
        quantity: celebrate_1.Joi.number().required()
    })
}), productsControler.create);
// update
productsRouter.put('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    },
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        price: celebrate_1.Joi.number().precision(2).required(),
        quantity: celebrate_1.Joi.number().required()
    }
}), productsControler.update);
// delete
productsRouter.delete('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    }
}), productsControler.delete);
exports.default = productsRouter;
