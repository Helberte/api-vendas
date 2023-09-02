import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import AppError from "src/shared/errors/AppError";
import User from "../typeorm/entities/User";
import { hash } from "bcryptjs";

interface IRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUserService{

  public async execute({ name, email, password}: IRequest) : Promise<User> {
    const userRepositoy   = getCustomRepository(UsersRepository);
    const emailUserExists = await userRepositoy.findByEmail(email);

    if(emailUserExists)
      throw new AppError('Já existe um email igual a este cadastrado, tente outro.');

    // cria hash na senha
    const hashedPassword = await hash(password, 8);

    const user = userRepositoy.create({
      name,
      email,
      password: hashedPassword
    });

    await userRepositoy.save(user);

    return user;
  }
}

export default CreateUserService;