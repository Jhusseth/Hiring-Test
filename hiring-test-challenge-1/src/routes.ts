
import Router from 'koa-router';
import config from './config';
import controller = require('./application/index');

const routes = new Router();

routes.get(`/${config.apiPrefix}/health/ping`, controller.health.ping);
routes.post(`/${config.apiPrefix}/message`, controller.message.saveMessage);
routes.put(`/${config.apiPrefix}/message`, controller.message.updateMessage);
routes.get(`/${config.apiPrefix}/message`, controller.message.getMessages);
routes.get(`/${config.apiPrefix}/date/message`, controller.message.getMessagesByDate);


export default routes;
