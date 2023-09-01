import { Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";

export default class UsersController{
  public async index(request: Request, response: Response) : Promise<Response>{
    const listUsers = new ListUserService();
    const users     = await listUsers.execute();

    return response.json( { usuarios: users } );
  }

  public async create(request: Request, response: Response) : Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name: (name as string).toUpperCase(),
      email,
      password
    });

    return response.json({ usuario: user});
  }
}