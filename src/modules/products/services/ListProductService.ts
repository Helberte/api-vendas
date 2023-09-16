import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import RedisCache from "src/shared/cache/RedisCache";

class ListProductService{

  public async execute() : Promise<Product[]> {

    const productRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    // procura no cache o equivalente à chave infomada
    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    // verifica se a informação está em cache, se não tiver, busca no banco e salva o cache
    if (!products) {
      products = await productRepository.find();

      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;