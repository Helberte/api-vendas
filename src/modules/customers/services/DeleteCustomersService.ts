import { getCustomRepository } from "typeorm";
import AppError from "src/shared/errors/AppError";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
}

class DeleteCustomersService{

  public async execute({ id }: IRequest) : Promise<string> {
    const customersRepositoy = getCustomRepository(CustomersRepository);

    const customer = await customersRepositoy.findById(id);

    if (!customer)
      throw new AppError('Usuário não existe.');

    await customersRepositoy.remove(customer);

    return 'Usuário removido com sucesso!';
  }
}

export default DeleteCustomersService;