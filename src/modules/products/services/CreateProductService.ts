import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "src/shared/errors/AppError";
import Product from "../typeorm/entities/Product";

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

    const product = productsRepositoy.create({
      name,
      price,
      quantity,
    });

    await productsRepositoy.save(product);

    return product;
  }
}

export default CreateProductService;