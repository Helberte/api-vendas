import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "src/shared/http/middlewares/isAuthenticated";
import ProfileController from "../controlers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated); // middleware que exige que todas as rotas estejam autenticadas

// lista usuarios
profileRouter.get('/', profileController.show);

// create users
profileRouter.put('/',
  celebrate({
    [Segments.BODY]: {
      name:     Joi.string().required(),
      email:    Joi.string().email().required(),
      password: Joi.string().required(),
      old_password: Joi.string().required(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required()
        })
    }
  }),
  profileController.update
);

export default profileRouter;