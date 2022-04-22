import * as express from 'express';
import { getRandomStr } from '../helper/string.helper';
import roomModel from '../models/room.model';

export default class RoomService {
    createRoom = async (request: express.Request, response: express.Response) => {
        try {
            const roomName: string = getRandomStr()
            const guestToken: string = request.cookies.guest_token;

            await roomModel.create({
                owner: guestToken,
                name: roomName
            })

            return roomName;

        } catch (error) {
            console.log(error);
        }
    }
}
