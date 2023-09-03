"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const celebrate_1 = require("celebrate");
const routes_1 = __importDefault(require("./routes"));
const AppError_1 = __importDefault(require("../errors/AppError"));
require("../typeorm");
const upload_1 = __importDefault(require("src/config/upload"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.directory)); // rota statica para obter os arquivos de usuário do servidor
// isso serve para facilitar o acesso a esta imagem por parte do front-end
app.use(routes_1.default);
app.use((0, celebrate_1.errors)());
app.use((error, request, response, next) => {
    if (error instanceof AppError_1.default) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});
app.listen(3333, () => {
    console.log('Server started on port 3333');
});
