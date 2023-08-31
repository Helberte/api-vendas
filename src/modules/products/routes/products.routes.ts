import { Router } from "express";
import ProductsController from "../controlers/ProductsController";

const productsRouter = Router();
const productsControler = new ProductsController();

productsRouter.get('/', productsControler.index);
productsRouter.get('/:id', productsControler.show);
productsRouter.post('/', productsControler.create);
productsRouter.put('/:id', productsControler.update);
productsRouter.delete('/:id', productsControler.delete);

export default productsRouter;