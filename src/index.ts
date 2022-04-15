import App from './app';
import TasksController from './controllers/tasks.controller';

require('dotenv').config();

const port: number | string = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || "mongodb://localhost:27017/db_name";

const app = new App(
  [
    new TasksController(),
  ],
  port,
  mongo_url
);

app.listen();
