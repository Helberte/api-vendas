"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomersController_1 = __importDefault(require("../controllers/CustomersController"));
const productsRouter = (0, express_1.Router)();
const customersControler = new CustomersController_1.default();
// index
productsRouter.get('/', customersControler.index);
/*
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

export default productsRouter;*/ 
