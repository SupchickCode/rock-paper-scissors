import * as express from 'express';
import IController from '../interface/controller.interface';
import IndexService from '../services/index.service';

export default class IndexController implements IController {

  public path: string = '';
  public router = express.Router();
  public service = new IndexService();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.index);
  }

  index = (request: express.Request, response: express.Response) => {
    response.render("index");
  }
}
