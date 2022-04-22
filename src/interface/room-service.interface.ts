import * as express from 'express';

export default interface IRoomService {
    createRoom(request: express.Request, response: express.Response) : Promise<string | undefined>;
}
