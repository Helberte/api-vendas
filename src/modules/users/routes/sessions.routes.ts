import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionsController from "../controlers/SessionsController";

const sessionsRouter = Router();
const sessionsController = new SessionsController();

// create users
sessionsRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      email:    Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  sessionsController.create
);

export default sessionsRouter;