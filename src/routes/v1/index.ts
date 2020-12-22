import AuthRoute from './auth.route';
import UsersRoute from './users.route';
import IndexRoute from './index.route';
import { Router } from 'express';

const ApiV1Router = Router();

ApiV1Router.use('/api/v1', new AuthRoute().router, new UsersRoute().router, new IndexRoute().router);

export default ApiV1Router;
