import * as express from 'express';
import IController from '../interface/controller.interface';
import roomModel from '../models/room.model';
import { getRandomStr } from '../helper/string.helper';

export default class RoomController implements IController {

  public path: string = '/room';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path + '/:name', this.showRoom);
    this.router.post(this.path, this.createRoom);
  }

  showRoom = async (request: express.Request, response: express.Response) => {
    const roomName = request.params.name

    response.render('room', { roomName: roomName });
  }

  createRoom = async (request: express.Request, response: express.Response) => {
    try {
      const roomName = getRandomStr()

      await roomModel.create({
        name: roomName
      })

      response.redirect(`/room/${roomName}`);

    } catch (error) {
      console.log(error);
    }
  }
}
