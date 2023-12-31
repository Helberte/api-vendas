import { EntityRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";

@EntityRepository(UserToken)
export class UsersTokensRepository extends Repository<UserToken>{

  public async findByToken(token: string): Promise<UserToken | undefined>{
    const userToken = await this.findOne({
      where: {
        token: token
      }
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken>{
    const userToken = this.create({
      user_id: user_id
    });

    await this.save(userToken);

    return userToken;
  }
}