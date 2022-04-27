import * as express from 'express';

export default interface IRoomService {
    createRoom(request: express.Request, response: express.Response): Promise<string | undefined>;
    getRoom(request: express.Request, response: express.Response): Promise<any | undefined>
    deleteRoom(request: express.Request): Promise<any | undefined>
    getRoomLink(request: express.Request, roomName: string): string
}
