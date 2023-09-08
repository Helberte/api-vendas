"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const CustomersController_1 = __importDefault(require("../controllers/CustomersController"));
const isAuthenticated_1 = __importDefault(require("src/shared/http/middlewares/isAuthenticated"));
const productsRouter = (0, express_1.Router)();
const customersControler = new CustomersController_1.default();
// index
productsRouter.get('/', isAuthenticated_1.default, customersControler.index);
// show
productsRouter.get('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    }
}), customersControler.show);
// create
productsRouter.post('/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
    })
}), customersControler.create);
// update
productsRouter.put('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    },
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
    }
}), customersControler.update);
// delete
productsRouter.delete('/:id', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: {
        id: celebrate_1.Joi.string().uuid().required()
    }
}), customersControler.delete);
exports.default = productsRouter;
