import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";

class ListUserService{

  public async execute() : Promise<User[]> {
    const userRepositoy = getCustomRepository(UsersRepository);
    const users = await userRepositoy.find();

    return users;
  }
}

export default ListUserService;