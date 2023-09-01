import { Request, Response } from "express";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import CreateProductService from "../services/CreateProductService";
import AppError from "src/shared/errors/AppError";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductservice";

export default class ProductsController{

  public async index(request: Request, response: Response) : Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return response.json( { produtos: products});
  }

  public async show(request: Request, response: Response) : Promise<Response> {
    const { id } = request.params;

    const showProducts = new ShowProductService();

    const product = await showProducts.execute({ id });

    return response.json({ produto: product});
  }

  public async create(request: Request, response: Response): Promise<Response>{
    const { name, price, quantity } = request.body;

    if (typeof price !== "number")
      throw new AppError('O parameto price aceita somente numeros.');

    if (typeof quantity !== "number")
      throw new AppError('O parameto quantity aceita somente numeros.');

    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name: (name as string).toUpperCase(),
      price,
      quantity
    });

    return response.json( { produto: product} );
  }

  public async update(request: Request, response: Response): Promise<Response>{
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    if (typeof price !== "number")
      throw new AppError('O parameto price aceita somente numeros.');

    if (typeof quantity !== "number")
      throw new AppError('O parameto quantity aceita somente numeros.');

    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({
      id: id,
      name: (name as string).toUpperCase(),
      price: price,
      quantity: quantity
    });

    return response.json( { produto: product} );
  }

  public async delete(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id });

    return response.json({ mensagem: "Produto deletado com sucesso."});
  }
}