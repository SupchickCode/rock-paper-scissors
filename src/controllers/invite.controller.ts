import * as express from 'express';
import IController from '../interface/controller.interface';

export default class InviteController implements IController {

  public path: string = '/invite';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.createRoom);
  }

  createRoom = (request: express.Request, response: express.Response) => {
    
  }
}
