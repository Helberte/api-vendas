import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate"; 'celebrate';
import OdersController from '../controllers/OdersController'
import isAuthenticated from "src/shared/http/middlewares/isAuthenticated";

const orderRouter = Router();
const ordersControler = new OdersController();

// show
orderRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]:
    {
      id: Joi.string().uuid().required()
    }
  }),
  ordersControler.show
);

// create
orderRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys(
      {
        customer_id: Joi.string().uuid().required(),
        products: Joi.required()
      }
    )
  }),
  ordersControler.create
);


export default orderRouter;