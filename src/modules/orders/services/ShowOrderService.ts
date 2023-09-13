import { getCustomRepository } from "typeorm";
import AppError from "src/shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";

interface IRequest{
  id: string;
}

class ShowOrderService{

  public async execute({ id }: IRequest) : Promise<Order> {
    const ordersRepositoy   = getCustomRepository(OrdersRepository);

    const order = await ordersRepositoy.findById(id);

    if (!order)
      throw new AppError('Ordem de compra não encontrada.');

    return order;
  }
}

export default ShowOrderService;