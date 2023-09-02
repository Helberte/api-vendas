import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import AppError from "src/shared/errors/AppError";
import User from "../typeorm/entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest{
  email: string;
  password: string;
}

interface IResponse{
  user: User;
  token: string;
}

class CreateSessionsService{

  public async execute({ email, password}: IRequest) : Promise<IResponse> {
    const userRepositoy   = getCustomRepository(UsersRepository);
    const userEmail = await userRepositoy.findByEmail(email);

    if(!userEmail)
      throw new AppError('Dados incorretos: Email/Senha.', 401);

    // compara a senha cadastrada e retorna se tem ou não acesso
    const passwordConfirmed = await compare(password, userEmail.password);

    if(!passwordConfirmed)
      throw new AppError('Dados incorretos: Email/Senha..', 401);

    const token = sign({ userId: userEmail.id }, 'ac2b7893067c581dc0f4f3b6e0441d95', {
      subject: userEmail.id,
      expiresIn: '1d'
    });

    return {
      user: userEmail,
      token: token
    };
  }
}

export default CreateSessionsService;