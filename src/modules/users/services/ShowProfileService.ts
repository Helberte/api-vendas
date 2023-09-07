import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import AppError from "src/shared/errors/AppError";

interface IRequest {
  user_id: string;
}

class ShowProfileService{

  public async execute({ user_id }: IRequest) : Promise<User | undefined> {
    const userRepositoy = getCustomRepository(UsersRepository);

    const user = await userRepositoy.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    return user;
  }
}

export default ShowProfileService;