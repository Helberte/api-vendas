import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import CustomersController from "../controllers/CustomersController";
import isAuthenticated from "src/shared/http/middlewares/isAuthenticated";

const productsRouter = Router();
const customersControler = new CustomersController();

// index
productsRouter.get('/', isAuthenticated, customersControler.index);

// show
productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]:
    {
      id: Joi.string().uuid().required()
    }
  }),
  customersControler.show
);

// create
productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys(
      {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      }
    )
  }),
  customersControler.create
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
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }
  }),
  customersControler.update
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
  customersControler.delete
);

export default productsRouter;