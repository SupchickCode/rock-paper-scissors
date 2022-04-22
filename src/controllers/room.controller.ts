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
    try {
      const roomName: string = request.params.name;

      const room = await roomModel.findOne({
        where: {
          name: roomName
        }
      });

      response.render('room', {
        room: room,
        roomLink: this.getRoomLink(request, room.name)
      });

    } catch (error) { }

    response.render('404');
  }

  createRoom = async (request: express.Request, response: express.Response) => {
    // TODO AFTER CREATE ROOM I NEED DO SOCKET CONNECTION FOR 2 PLAYERS
    // AND START WAIT FOR CONNECTION FROM SECOND PLAYER OR SMTH LIKE THIS
    const roomName = await this.service.createRoom(request, response);

    response.redirect(`/room/${roomName}`);
  }

  private getRoomLink = (request: express.Request, roomName: string): string => {
    return request.protocol + '://' + request.get('host') + '/room/' + roomName;;
  }

  private removeOldRomm = () => {
    // TODO REMOVE ROOM IF IT MORE THAT 5 (ONE PERSON)
  }
}
