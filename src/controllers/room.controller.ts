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
    const roomName: string = request.params.name;
    const roomLink: string = this.getRoomLink(request, roomName);

    response.render('room', {
      roomName: roomName,
      roomLink: roomLink
    });
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

  private getRoomLink = (request: express.Request, roomName: string): string => {
    return request.protocol + '://' + request.get('host') + '/room/' + roomName;;
  }
}
