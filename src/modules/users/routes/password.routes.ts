import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionsController from "../controlers/SessionsController";
import ForgotPasswordController from '../controlers/ForgotPasswordController';
import ResetPasswordController from "../controlers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

// após as validações, cria o token para redefinicao de senha
passwordRouter.post('/forgot',
  celebrate({
    [Segments.BODY]: {
      email:    Joi.string().email().required()
    }
  }),
  forgotPasswordController.create
);

// reset password
passwordRouter.post('/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().min(6).required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')) // requer que o campo seja igual ao campo password
    }
  }),
  resetPasswordController.create
);

export default passwordRouter;