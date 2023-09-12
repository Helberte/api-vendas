import { getCustomRepository } from "typeorm";
import AppError from "src/shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import { CustomersRepository } from "src/modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "src/modules/products/typeorm/repositories/ProductsRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest{
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService{

  public async execute({ customer_id, products }: IRequest) : Promise<Order> {
    const ordersRepositoy   = getCustomRepository(OrdersRepository);
    const customerRepositoy = getCustomRepository(CustomersRepository);
    const productsRepositoy  = getCustomRepository(ProductRepository);

    const customerExists = await customerRepositoy.findById(customer_id);

    if(!customerExists)
      throw new AppError('Não existe este cliente.');

    const existsProducts = await productsRepositoy.findAllByIds(products);

    
  }
}

export default CreateOrderService;