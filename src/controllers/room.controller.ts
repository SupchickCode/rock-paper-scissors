import * as express from 'express';
import IController from '../interface/controller.interface';
import roomModel from '../models/room.model';
import RoomService from '../services/room.service';

export default class RoomController implements IController {

  public path: string = '/room';
  public router = express.Router();
  public service = new RoomService();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path + '/:name', this.showRoom);
    this.router.post(this.path, this.createRoom);
  }

  showRoom = async (request: express.Request, response: express.Response) => {
    this.service.showRoom(request, response);
  }

  createRoom = async (request: express.Request, response: express.Response) => {
    const roomName = await this.service.createRoom(request, response);

    response.redirect(`/room/${roomName}`);
  }
}
