import { Request, Response } from "express";
import ListCustomersService from "../services/ListCustomersService";
import ShowCustomersService from "../services/ShowCustomersService";
import CreateCustomersService from "../services/CreateCustomersService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomersService from "../services/DeleteCustomersService";


export default class CustomersController{

  public async index(request: Request, response: Response) : Promise<Response> {
    const listCustomers = new ListCustomersService();

    const customers = await listCustomers.execute();

    return response.json( { clientes: customers } );
  }

  public async show(request: Request, response: Response) : Promise<Response> {
    const { id } = request.params;

    const showCustomer = new ShowCustomersService();
    const customer     = await showCustomer.execute({ id });

    return response.json( { cliente: customer } );
  }

  public async create(request: Request, response: Response): Promise<Response>{
    const { name, email } = request.body;

    const createCustomer = new CreateCustomersService();
    const customer = await createCustomer.execute({
      name: (name as string).toUpperCase(),
      email
    });

    return response.json( { cliente: customer} );
  }

  public async update(request: Request, response: Response): Promise<Response>{
    const { name, email } = request.body;
    const { id }          = request.params;

    const updateCustomer = new UpdateCustomerService();
    const customer       = await updateCustomer.execute({
      id: id,
      name: (name as string).toUpperCase(),
      email
    });

    return response.json( { cliente: customer} );
  }

  public async delete(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomersService();
    await deleteCustomer.execute({ id });

    return response.json({ mensagem: "Cliente deletado com sucesso."});
  }
}