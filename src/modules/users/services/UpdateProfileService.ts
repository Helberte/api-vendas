import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import AppError from "src/shared/errors/AppError";
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

class UpdateProfileService{

  public async execute({ user_id,
    name,
    email,
    password,
    old_password
  }: IRequest): Promise<User | undefined> {
    const userRepositoy = getCustomRepository(UsersRepository);

    const user     = await userRepositoy.findById(user_id);
    const userCopy = user;

    if (user)
      throw new AppError('Usuário não encontrado.');

    const userUpdateEmail = await userRepositoy.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id != user_id)
      throw new AppError('Email já está em uso.');

    const checkOldPassword = await compare(old_password, userCopy?.password || '')

    if (!checkOldPassword)
      throw new AppError('As senhas não coincidem.');

    if (userCopy) {
      userCopy.password = await hash(password, 8);
      userCopy.email = email;
      userCopy.name = name;

      await userRepositoy.save(userCopy);
    }

    return user;
  }
}

export default UpdateProfileService;