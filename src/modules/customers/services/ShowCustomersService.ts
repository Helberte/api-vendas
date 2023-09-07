import { getCustomRepository } from "typeorm";
import AppError from "src/shared/errors/AppError";
import Customer from "../typeorm/entities/Customers";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
}

class ShowCustomersService{

  public async execute({ id }: IRequest) : Promise<Customer | undefined> {
    const customersRepositoy = getCustomRepository(CustomersRepository);

    const customer = await customersRepositoy.findById(id);

    if (!customer) {
      throw new AppError('Usuário não encontrado.');
    }

    return customer;
  }
}

export default ShowCustomersService;