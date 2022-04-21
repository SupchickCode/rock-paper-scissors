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
    try {
      const roomName: string = request.params.name;

      const room = await roomModel.findOne({
        where: {
          name: roomName
        }
      });

      response.render('room', {
        room: room.name,
        roomLink: this.getRoomLink(request, room.name)
      });

    } catch (error) { }

    response.render('404');
  }

  createRoom = async (request: express.Request, response: express.Response) => {
    try {
      const roomName: string = getRandomStr()
      const guestToken: string = request.cookies.guest_token;

      await roomModel.create({
        owner: guestToken,
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

  private removeOldRomm = () => {

  }
}
