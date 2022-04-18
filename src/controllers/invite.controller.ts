import * as express from 'express';
import IController from '../interface/controller.interface';
import roomModel from '../models/room.model';
import { getRandomStr } from '../helper/string.helper';

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
    try {
      await roomModel.create({
        name: getRandomStr()
      })
    } catch (error) {
      console.log(error);
    }
  }
}
