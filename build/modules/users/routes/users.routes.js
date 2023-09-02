"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsersController_1 = __importDefault(require("../controlers/UsersController"));
const celebrate_1 = require("celebrate");
const isAuthenticated_1 = __importDefault(require("src/shared/http/middlewares/isAuthenticated"));
const usersRouter = (0, express_1.Router)();
const usersController = new UsersController_1.default();
// lista usuarios
usersRouter.get('/', isAuthenticated_1.default, usersController.index);
// create users
usersRouter.post('/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required()
    }
}), usersController.create);
exports.default = usersRouter;
