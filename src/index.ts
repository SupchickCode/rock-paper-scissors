import App from './app';
import IndexContoller from './controllers/index.controller';

require('dotenv').config();

const port: number | string = process.env.PORT || 3000;

const app = new App(
  [
    new IndexContoller(),
  ],
  port
);

app.listen();
