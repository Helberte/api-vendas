import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "src/shared/errors/AppError";

interface IRequest {
  id: string;
}

class ShowProductService{
  public async execute({ id }: IRequest): Promise<Product | undefined>{

    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(
      {
        where: {
          id: id
        }
      }
    )

    if (!product)
      throw new AppError('Produto não existe.');

    return product;
  }
}

export default ShowProductService;