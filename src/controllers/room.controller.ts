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
  }

  showRoom = async (request: express.Request, response: express.Response) => {
    const room: any = await this.service.getRoom(request, response);
    const guestToken: string = request.cookies.guest_token;

    const roomLink: string | null =
      guestToken === room.owner ? this.service.getRoomLink(request, room.name) : null;

    if (room) {
      response.render('room', {
        room: room,
        roomLink: roomLink
      });
    }

    response.render('404');
  }

  createRoom = async (request: express.Request, response: express.Response) => {
    const roomName = await this.service.createRoom(request, response);

    response.redirect(`/room/${roomName}`);
  }
}
