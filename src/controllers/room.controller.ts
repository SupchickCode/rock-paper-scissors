import * as express from 'express';
import IController from '../interface/controller.interface';
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
    this.router.delete(this.path, this.deleteRoom);
  }

  showRoom = async (request: express.Request, response: express.Response) => {
    const room: any = await this.service.getRoom(request, response);
    const guestToken: string = request.cookies.guest_token;

    if (room) {
      const roomLink: string | null =
      guestToken === room.owner ? this.service.getRoomLink(request, room.name) : null;

      response.render('room', {
        room: room,
        roomLink: roomLink,
        guestToken: guestToken
      });
    }

    response.render('404');
  }

  createRoom = async (request: express.Request, response: express.Response) => {
    const roomName = await this.service.createRoom(request);

    if (roomName) {
      response.json({
        data: roomName,
        status: 201
      });
    }

    response.json({
      data: "У вас уже и так 5 комнат больше нельзя",
      status: 422
    });
  }

  deleteRoom = async (request: express.Request, response: express.Response) => {
    this.service.deleteRoom(request);

    response.json({
      status: 204
    });
  }
}
