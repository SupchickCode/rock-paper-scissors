import App from './app';
import IndexContoller from './controllers/index.controller';
import InviteController from './controllers/invite.controller';
import appConfig from './config/app';

const port: number | string = appConfig.port;

const app = new App(
  [
    new IndexContoller(),
    new InviteController(),
  ],
  port
);

app.listen();
