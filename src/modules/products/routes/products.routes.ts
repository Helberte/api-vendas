import { Router } from "express";
import ProductsController from "../controlers/ProductsController";
import { celebrate, Joi, Segments } from "celebrate"; 'celebrate';

const productsRouter = Router();
const productsControler = new ProductsController();

// index
productsRouter.get('/', productsControler.index);

// show
productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]:
    {
      id: Joi.string().uuid().required()
    }
  }),
  productsControler.show
);

// create
productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys(
      {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required()
      }
    )
  }),
  productsControler.create
);

// update
productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]:
    {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]:
    {
      name:     Joi.string().required(),
      price:    Joi.number().precision(2).required(),
      quantity: Joi.number().required()
    }
  }),
  productsControler.update
);

// delete
productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]:
    {
      id: Joi.string().uuid().required()
    }
    }),
  productsControler.delete
);

export default productsRouter;