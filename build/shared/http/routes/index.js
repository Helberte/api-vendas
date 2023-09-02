"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_routes_1 = __importDefault(require("../../../modules/products/routes/products.routes"));
const users_routes_1 = __importDefault(require("../../../modules/users/routes/users.routes"));
const routes = (0, express_1.Router)();
routes.use('/products', products_routes_1.default);
routes.use('/users', users_routes_1.default);
exports.default = routes;
