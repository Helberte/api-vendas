import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import AppError from "src/shared/errors/AppError";
import User from "../typeorm/entities/User";
import path from "path";
import uploadConfig from "src/config/upload";
import fs from 'fs';

interface IRequest{
  user_id: string;
  avatarFilename: string | undefined;
}

class UpdateUserAvatarService{

  public async execute({ user_id, avatarFilename }: IRequest) : Promise<User> {
    const userRepositoy   = getCustomRepository(UsersRepository);

    const user = await userRepositoy.findById(user_id);

    if (!user)
      throw new AppError('Usuário não existe.');

    // se existir arquivo no server, apaga
    if (user.avatar) {
      const userAvatarFilePath   = path.join(uploadConfig.directory, user.avatar); // pega o caminho completo do arquivo caso exista
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);     // verifica o status do arquivo passado por param

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); // remove o arquivo
      }
    }

    user.avatar = avatarFilename;

    await userRepositoy.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;