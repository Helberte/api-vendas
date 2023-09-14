import { Router } from 'express';
import productsRouter from '../../../modules/products/routes/products.routes';
import usersRouter from '../../../modules/users/routes/users.routes';
import sessionsRouter from 'src/modules/users/routes/sessions.routes';
import passwordRouter from 'src/modules/users/routes/password.routes';
import profileRouter from 'src/modules/users/routes/profile.routes';
import customersRouter from 'src/modules/customers/routes/customers.routes';
import orderRouter from 'src/modules/orders/routers/orders.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', orderRouter);


export default routes;