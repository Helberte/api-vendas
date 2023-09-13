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

    // if(!customerExists)
    //   throw new AppError('Não existe este cliente.');

    // const existsProducts = await productsRepositoy.findAllByIds(products);

    // if (!existsProducts.length)
    //   throw new AppError('Nenhum dos produtos informados existem cadastrados.');

    // // pega todos os produtos existentes
    // const existsProductsId = existsProducts.map((product) => product.id);

    // // pega os que não existem
    // const checkInexistentProducts = products.filter(
    //   product => !existsProductsId.includes(product.id)
    // )

    // if (checkInexistentProducts.length)
    //   throw new AppError(`Alguns produtos não foram encontrados no cadastro. ${checkInexistentProducts} `);

    // const quantityAvailable = products.filter(
    //   product => existsProducts.filter(
    //     p => p.id === product.id
    //   )[0].quantity < product.quantity
    // );

    // // não permite vender uma quantidade menor do que tem no estoque
    // if (quantityAvailable.length)
    //   throw new AppError(`A quantidade. ${quantityAvailable[0].quantity} não é valida para o produto: ${quantityAvailable[0].id}`);

    // const serializedProducts = products.map(
    //   product => ({
    //     product_id: product.id,
    //     quantity: product.quantity,
    //     price: existsProducts.filter(p => p.id === product.id)[0].price
    //   })
    // );

    // const order = await ordersRepositoy.createOrder({
    //   customer: customerExists,
    //   products: serializedProducts
    // });

    // const {  order_products } = order as Order;

    // const updatedProductQuantity = order_products.map(
    //   product => ({
    //     id: product.product_id,
    //     quantity: existsProducts.filter(p => p.id === product.id)[0].quantity - product.quantity
    //   })
    // );

    // await productsRepositoy.save(updatedProductQuantity);

    // return order;
  }
}

export default ShowOrderService;