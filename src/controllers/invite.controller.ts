import * as express from 'express';
import IController from '../interface/controller.interface';
import roomModel from '../models/room.model';

export default class InviteController implements IController {

  public path: string = '/invite';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, this.createRoom);
  }

  createRoom = async (request: express.Request, response: express.Response) => {
    await roomModel.create({
      name: 'xxx'
    })
    
    
    .catch((err) => {
      console.log(err);
    })
  }
}
