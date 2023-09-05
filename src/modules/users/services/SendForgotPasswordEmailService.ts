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
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[API Vendas] Recuperação de senha.',
      templateData: {
        template: `Olá {{name}} Solicitação de redefinição de senha recebida: {{token}}`,
        variables: {
          name: user.name,
          token: userToken.token
        }
      },
    });
  }
}

export default SendForgotPasswordEmailService;