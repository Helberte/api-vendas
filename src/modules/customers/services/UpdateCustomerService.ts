import { getCustomRepository } from "typeorm";
import AppError from "src/shared/errors/AppError";
import { compare, hash } from 'bcryptjs';
import Customer from "../typeorm/entities/Customers";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService{

  public async execute({ id,
    name,
    email
  }: IRequest): Promise<Customer | undefined> {
    const customerRepositoy = getCustomRepository(CustomersRepository);

    const customer     = await customerRepositoy.findById(id);
    const customerCopy = customer;

    if (!customer)
      throw new AppError('Cliente não encontrado.');

    const customerUpdateEmail = await customerRepositoy.findByEmail(email);

    if (customerUpdateEmail && customerUpdateEmail.id != id)
      throw new AppError('Email já está em uso.');

    if (customerCopy) {
      customerCopy.email = email;
      customerCopy.name  = name.toUpperCase();

      await customerRepositoy.save(customerCopy);
    }

    return customerCopy;
  }
}

export default UpdateCustomerService;