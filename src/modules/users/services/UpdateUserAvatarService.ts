import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import AppError from "src/shared/errors/AppError";
import User from "../typeorm/entities/User";
import path from "path";
import uploadConfig from "src/config/upload";
import fs from 'fs';
import DiskStorageProvider from "src/shared/providers/StorageProvider/DiskStorageProvider";

interface IRequest{
  user_id: string;
  avatarFilename: string | undefined;
}

class UpdateUserAvatarService{

  public async execute({ user_id, avatarFilename }: IRequest) : Promise<User> {
    const userRepositoy   = getCustomRepository(UsersRepository);
    const storageProvider = new DiskStorageProvider();

    // pega o usuário no banco
    const user = await userRepositoy.findById(user_id);

    if (!user)
      throw new AppError('Usuário não existe.');

    // se existir arquivo no server, apaga
    if (user.avatar) {
      await storageProvider.deleFile(user.avatar);
    }

    let filename: string = "";

    if (avatarFilename)
      filename = await storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await userRepositoy.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;