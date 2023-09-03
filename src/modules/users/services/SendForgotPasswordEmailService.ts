import { getCustomRepository } from "typeorm";
import AppError from "src/shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../typeorm/repositories/UsersTokensRepository";

interface IRequest{
  email: string;
}

class SendForgotPasswordEmailService{

  public async execute({ email }: IRequest) : Promise<void> {
    const userRepositoy        = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UsersTokensRepository);

    const user = await userRepositoy.findByEmail(email);

    if (!user)
      throw new AppError('Email do usuário não encontrado na base.');

    const userToken = await userTokensRepository.generate(user.id);

    console.log(userToken);
  }
}

export default SendForgotPasswordEmailService;