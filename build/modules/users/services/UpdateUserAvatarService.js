"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const UsersRepository_1 = require("../typeorm/repositories/UsersRepository");
const AppError_1 = __importDefault(require("src/shared/errors/AppError"));
const DiskStorageProvider_1 = __importDefault(require("src/shared/providers/StorageProvider/DiskStorageProvider"));
class UpdateUserAvatarService {
    execute({ user_id, avatarFilename }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepositoy = (0, typeorm_1.getCustomRepository)(UsersRepository_1.UsersRepository);
            const storageProvider = new DiskStorageProvider_1.default();
            // pega o usuário no banco
            const user = yield userRepositoy.findById(user_id);
            if (!user)
                throw new AppError_1.default('Usuário não existe.');
            // se existir arquivo no server, apaga
            if (user.avatar) {
                yield storageProvider.deleFile(user.avatar);
            }
            let filename = "";
            if (avatarFilename)
                filename = yield storageProvider.saveFile(avatarFilename);
            user.avatar = filename;
            yield userRepositoy.save(user);
            return user;
        });
    }
}
exports.default = UpdateUserAvatarService;
