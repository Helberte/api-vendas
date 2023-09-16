import { Not, getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "src/shared/errors/AppError";
import RedisCache from "src/shared/cache/RedisCache";

interface IRequest{
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService{

  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {

    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);
    if (!product)
      throw new AppError('Produto inexistente.');

    const productName = await productRepository.findOne({
      where: {
        name: name,
        id: Not(id),
      },
    });

    if (productName)
      throw new AppError('Já existe um produto com este nome.');

    const redisCache = new RedisCache();

    product.name  = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    
    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;