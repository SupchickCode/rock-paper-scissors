import * as express from 'express';
import { getRandomStr } from '../helper/string.helper';
import roomModel from '../models/room.model';
import IRoomService from '../interface/room-service.interface';

export default class RoomService implements IRoomService {
    createRoom = async (request: express.Request, response: express.Response): Promise<string | undefined> => {
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

    showRoom = async (request: express.Request, response: express.Response) => {
        try {
            const roomName: string = request.params.name;
            const guestToken: string = request.cookies.guest_token;

            const room = await roomModel.findOne({
                where: {
                    name: roomName
                }
            });

            this.editInvitedUserToRoom(response, room, guestToken);

            response.render('room', {
                room: room,
                roomLink: this.getRoomLink(request, room.name)
            });

        } catch (error) { }

        response.render('404');
    }

    private editInvitedUserToRoom = async (response: express.Response, room: any, guestToken: string) => {
        if (room.owner !== guestToken && room.invited === null) {
            await room.update(
                { invited: guestToken },
            )
        }

        if (room.owner !== guestToken &&
            room.invited !== null && room.invited !== guestToken) {
            response.render('busy');
        }
    }

    private getRoomLink = (request: express.Request, roomName: string): string => {
        return request.protocol + '://' + request.get('host') + '/room/' + roomName;;
    }

    private removeOldRomm = () => {
        // TODO REMOVE ROOM IF IT MORE THAT 5 (ONE PERSON)
    }
}
