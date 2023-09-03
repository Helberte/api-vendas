"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const ForgotPasswordController_1 = __importDefault(require("../controlers/ForgotPasswordController"));
const passwordRouter = (0, express_1.Router)();
const forgotPasswordController = new ForgotPasswordController_1.default();
// create users
passwordRouter.post('/forgot', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        email: celebrate_1.Joi.string().email().required()
    }
}), forgotPasswordController.create);
exports.default = passwordRouter;
