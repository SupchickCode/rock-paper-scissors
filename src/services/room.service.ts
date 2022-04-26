import * as express from 'express';
import { getRandomStr } from '../helper/string.helper';
import roomModel from '../models/room.model';
import IRoomService from '../interface/room-service.interface';
import sequelize from '../database/sequelize';
import { QueryTypes } from 'sequelize';

export default class RoomService implements IRoomService {
    createRoom = async (request: express.Request, response: express.Response): Promise<any | boolean> => {
        try {
            const roomName: string = getRandomStr();
            const guestToken: string = request.cookies.guest_token;

            if (await this.onlyFiveRooms(guestToken)) {
                await roomModel.create({
                    owner: guestToken,
                    name: roomName
                })

                return roomName;
            }
        } catch (error) {
            console.log(">> " + error);
        }

        return false;
    }

    getRoom = async (request: express.Request, response: express.Response): Promise<any | undefined> => {
        try {
            const roomName: string = request.params.name;
            const guestToken: string = request.cookies.guest_token;

            const room = await roomModel.findOne({
                where: {
                    name: roomName
                }
            });

            const editSuccess: boolean = await this.editInvitedUserToRoom(response, room, guestToken);

            if (!editSuccess) {
                if (room.owner !== guestToken &&
                    room.invited !== null && room.invited !== guestToken) {
                    response.render('busy');
                }
            }

            return room;

        } catch (error) { }
    }

    private editInvitedUserToRoom = async (response: express.Response, room: any, guestToken: string): Promise<boolean> => {
        if (room.owner !== guestToken && room.invited === null) {
            await room.update(
                { invited: guestToken },
            )

            return true;
        }

        return false;
    }

    getRoomLink = (request: express.Request, roomName: string): string => {
        return request.protocol + '://' + request.get('host') + '/room/' + roomName;;
    }

    private onlyFiveRooms = async (guestToken: string): Promise<boolean> => {
        try {
            const data: any = await sequelize.query(`SELECT COUNT(name) FROM rooms WHERE owner = '${guestToken}'`, { type: QueryTypes.SELECT });
            const count = data[0].count;

            if (count >= 5) {
                return false;

            }
        } catch (error) {
            console.log(">> " + error);
            return false;
        }

        return true;
    }
}
