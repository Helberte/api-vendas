import { getCustomRepository } from "typeorm";
import AppError from "src/shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from "src/config/mail/EtherealMail";

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

    // console.log(userToken);

    await EtherealMail.sendMail({
      to: email,
      body: `Olá ${user.name}, para recuperar sua senha, clique no link abaixo: token=${userToken?.token}`,
    });
  }
}

export default SendForgotPasswordEmailService;