import { Router } from 'express';

import createWaterDataController from './app/controllers/CreateWaterDataController';

const routes = new Router();

routes.post('/', createWaterDataController.store);
routes.get('/table/:date', createWaterDataController.index);

export default routes;
