import { getCustomRepository } from "typeorm";
import AppError from "src/shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../typeorm/repositories/UsersTokensRepository";
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs";

interface IRequest{
  token: string;
  password: string;
}

class ResetPasswordService{

  public async execute({ token, password }: IRequest) : Promise<void> {
    const userRepositoy        = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UsersTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken)
      throw new AppError('Token do usuário não existe.');

    const user = await userRepositoy.findById(userToken.user_id);

    if (!user)
      throw new AppError('Usuário não existe.');

    const tokenCreatedAt = userToken.created_at;
    const compareDate    = addHours(tokenCreatedAt, 2); // adiciona 2 horas

    if (isAfter(Date.now(), compareDate))
      throw new AppError('Token expirado.');

    user.password = await hash(password, 8);
  }
}

export default ResetPasswordService;