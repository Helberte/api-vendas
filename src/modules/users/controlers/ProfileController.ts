import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";
import { instanceToInstance } from 'class-transformer';

export default class ProfileController{
  public async show(request: Request, response: Response) : Promise<Response>{
    const showProfile = new ShowProfileService();
    const user_id = request.user.id;

    const user     = await showProfile.execute({ user_id });

    return response.json({ usuario: instanceToInstance(user) }); // instanceToInstance aplica a modificacao que foi colocada no model de user
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfile = new UpdateProfileService();
    const user = await updateProfile.execute({
      user_id: user_id,
      name: name,
      email: email,
      password: password,
      old_password: old_password
    });

    return response.json({ usuario: instanceToInstance(user) });
  }
}