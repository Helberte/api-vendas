import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "src/shared/errors/AppError";
import RedisCache from "src/shared/cache/RedisCache";

interface IRequest{
  id: string;
}

class DeleteProductService{

  public async execute({ id }: IRequest): Promise<void>{

    const productRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();
    const product    = await productRepository.findOne(id);

    if(!product)
      throw new AppError('Produto não existe');

    // invalida o cache
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productRepository.remove(product);
  }
}

export default  DeleteProductService;