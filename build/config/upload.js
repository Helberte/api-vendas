"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
// para poder determinar um local pra encontrar um dir ou arquivo
// pegar path atual usa-se a var global __dirname => pega o local atual de onde está sendo chamada
const uploadFolder = path_1.default.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path_1.default.resolve(__dirname, '..', '..', 'temp');
// estes pontos seginifica que está voltando mais um nível
// sendo assim, pegamos o path do local onde armazenar as imagens
exports.default = {
    directory: uploadFolder,
    tmpFolder,
    storage: multer_1.default.diskStorage({
        destination: uploadFolder,
        filename(request, file, callback) {
            const fileHash = crypto_1.default.randomBytes(10).toString('hex'); // crie um hash
            const fileName = `${fileHash}-${file.originalname}`; // define o nome do arquivo
            callback(null, fileName);
        }
    }) // armazenar em disco no server
};
