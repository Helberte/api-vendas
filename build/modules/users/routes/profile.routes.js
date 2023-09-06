"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const isAuthenticated_1 = __importDefault(require("src/shared/http/middlewares/isAuthenticated"));
const ProfileController_1 = __importDefault(require("../controlers/ProfileController"));
const profileRouter = (0, express_1.Router)();
const profileController = new ProfileController_1.default();
profileRouter.use(isAuthenticated_1.default); // middleware que exige que todas as rotas estejam autenticadas
// lista usuarios
profileRouter.get('/', profileController.show);
// create users
profileRouter.put('/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
        old_password: celebrate_1.Joi.string().required(),
        password_confirmation: celebrate_1.Joi.string()
            .valid(celebrate_1.Joi.ref('password'))
            .when('password', {
            is: celebrate_1.Joi.exist(),
            then: celebrate_1.Joi.required()
        })
    }
}), profileController.update);
exports.default = profileRouter;
