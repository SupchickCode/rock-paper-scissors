import * as express from 'express';
import IController from '../interface/controller.interface';

export default class IndexController implements IController {

  public path: string = '';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.index);
  }

  index = (request: express.Request, response: express.Response) => {
    console.log('Cookies: ', request.cookies)
    response.render("index");
  }
}
