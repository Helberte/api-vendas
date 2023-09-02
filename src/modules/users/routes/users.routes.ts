import { Router } from "express";
import UsersController from "../controlers/UsersController";
import { celebrate, Joi, Segments } from "celebrate"; 'celebrate';

const usersRouter = Router();
const usersController = new UsersController();

// lista usuarios
usersRouter.get('/', usersController.index);

// create users
usersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name:     Joi.string().required(),
      email:    Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create
);

export default usersRouter;