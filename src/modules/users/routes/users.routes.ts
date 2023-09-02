import { Router } from "express";
import UsersController from "../controlers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "src/shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();

// lista usuarios
usersRouter.get('/', isAuthenticated, usersController.index);

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