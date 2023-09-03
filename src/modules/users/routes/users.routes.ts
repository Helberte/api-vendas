import { Router } from "express";
import UsersController from "../controlers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "src/shared/http/middlewares/isAuthenticated";
import multer from 'multer';
import uploadConfig from 'src/config/upload';
import UserAvatarController from "../controlers/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarContoller = new UserAvatarController();
const upload = multer(uploadConfig);

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

// update avatar
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarContoller.update
);

export default usersRouter;