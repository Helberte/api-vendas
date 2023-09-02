"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const SessionsController_1 = __importDefault(require("../controlers/SessionsController"));
const sessionsRouter = (0, express_1.Router)();
const sessionsController = new SessionsController_1.default();
// create users
sessionsRouter.post('/', (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required()
    }
}), sessionsController.create);
exports.default = sessionsRouter;
