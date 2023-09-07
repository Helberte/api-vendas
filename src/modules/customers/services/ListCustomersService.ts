import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customers";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

class ListCustomersService{

  public async execute() : Promise<Customer[]> {
    const customersRepositoy = getCustomRepository(CustomersRepository);
    const customers          = await customersRepositoy.find();

    return customers;
  }
}

export default ListCustomersService;