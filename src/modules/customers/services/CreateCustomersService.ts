import { getCustomRepository } from "typeorm";
import AppError from "src/shared/errors/AppError";
import Customer from "../typeorm/entities/Customers";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest{
  name: string;
  email: string;
}

class CreateCustomersService{

  public async execute({ name, email }: IRequest) : Promise<Customer> {
    const customerRepositoy   = getCustomRepository(CustomersRepository);
    const emailCustomerExists = await customerRepositoy.findByEmail(email);

    if(emailCustomerExists)
      throw new AppError('Já existe um email igual a este cadastrado, tente outro.');

    const customer = customerRepositoy.create({
      name,
      email
    });

    await customerRepositoy.save(customer);

    return customer;
  }
}

export default CreateCustomersService;