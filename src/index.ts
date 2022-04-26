import App from './app';
import IndexContoller from './controllers/index.controller';
import RoomController from './controllers/room.controller';
import appConfig from './config/app';

const port: number | string = appConfig.port;

const app = new App(
  [
    new RoomController(),
    new IndexContoller(),
  ],
  port
);

app.listen().listenSocket();
