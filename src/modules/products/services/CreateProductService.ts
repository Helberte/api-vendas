import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "src/shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import RedisCache from "src/shared/cache/RedisCache";

interface IRequest{
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService{

  public async execute({ name, price, quantity}: IRequest) : Promise<Product> {
    const productsRepositoy = getCustomRepository(ProductRepository);
    const productExists = await productsRepositoy.findByName(name);

    if(productExists)
      throw new AppError('Já existe um produto com este nome.');

    const redisCache = new RedisCache();

    const product = productsRepositoy.create({
      name,
      price,
      quantity,
    });

    // invalida o cache salvo no redis visto que foi feito uma alteração nos produtos
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepositoy.save(product);

    return product;
  }
}

export default CreateProductService;