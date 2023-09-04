"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const ForgotPasswordController_1 = __importDefault(require("../controlers/ForgotPasswordController"));
const ResetPasswordController_1 = __importDefault(require("../controlers/ResetPasswordController"));
const passwordRouter = (0, express_1.Router)();
const forgotPasswordController = new ForgotPasswordController_1.default();
const resetPasswordController = new ResetPasswordController_1.default();
// após as validações, cria o token para redefinicao de senha
passwordRouter.post('/forgot', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        email: celebrate_1.Joi.string().email().required()
    }
}), forgotPasswordController.create);
// reset password
passwordRouter.post('/reset', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        token: celebrate_1.Joi.string().uuid().required(),
        password: celebrate_1.Joi.string().min(6).required(),
        passwordConfirmation: celebrate_1.Joi.string().required().valid(celebrate_1.Joi.ref('password')) // requer que o campo seja igual ao campo password
    }
}), resetPasswordController.create);
exports.default = passwordRouter;
