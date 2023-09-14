import { getCustomRepository } from "typeorm";
import AppError from "src/shared/errors/AppError";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from "src/config/mail/EtherealMail";
import path from 'path';

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

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[API Vendas] Recuperação de senha.',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${userToken.token}`
        }
      },
    });
  }
}

export default SendForgotPasswordEmailService;