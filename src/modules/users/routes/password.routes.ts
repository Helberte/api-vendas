import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionsController from "../controlers/SessionsController";
import ForgotPasswordController from '../controlers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

// create users
passwordRouter.post('/forgot',
  celebrate({
    [Segments.BODY]: {
      email:    Joi.string().email().required()
    }
  }),
  forgotPasswordController.create
);

export default passwordRouter;