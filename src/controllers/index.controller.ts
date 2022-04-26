import * as express from 'express';
import IController from '../interface/controller.interface';
import roomModel from '../models/room.model';

export default class IndexController implements IController {

  public path: string = '';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.index);
    this.router.get("*", this.notFound);
  }

  index = async (request: express.Request, response: express.Response) => {
    const guestToken: string = request.cookies.guest_token;
    let rooms: any[] = [];

    if (guestToken) {
      rooms = await roomModel.findAll({
        where: {
          owner: guestToken
        },
        order: [
          ["id", "DESC"]
        ]
      });
    }

    response.render("index", { 'rooms': rooms });
  }

  notFound = (request: express.Request, response: express.Response) => {
    response.render('404');
  }
}
