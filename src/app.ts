import express from "express";
import cookieParser from "cookie-parser";
import * as bodyParser from 'body-parser';
import IController from './interface/controller.interface';
import cookiesMiddleware from './middleware/cookies.middleware';
import { Server } from "socket.io";
import http from 'http';
import GameService from "./services/game.service";
import IGameService from "./interface/game-service.interface";
import typeMove from './types/move.type';
import roomModel from "./models/room.model";
import moveTypes from "./enums/move-types.enum";

export default class App {
    public app: express.Application;
    public port: number | string;
    public io: Server;
    public server: any;
    public ioRooms: object[];
    public gameService: IGameService;

    constructor(controllers: IController[], port: number | string) {
        this.app = express();
        this.port = port;
        this.server = http.createServer(this.app);
        this.gameService = new GameService();

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen(): this {
        const server = this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });

        this.initializeSocketServer(server);

        return this;
    }


    public listenSocket(): this {

        const rooms: { [key: string]: any } = {};

        this.io.on('connection', (socket) => {
            socket.on('join room', (roomName) => {
                if (!(roomName in rooms)) {
                    rooms[roomName] = [];
                }

                socket.join(roomName);
            });

            socket.on('make move', async (data: typeMove) => {
                try {
                    rooms[data.roomName].push(data);

                    if (rooms[data.roomName].length >= 2) {
                        const move: typeMove = this.gameService.findWinnerMove(rooms, data);
                        const updateRoom = await this.gameService.updatePoints(move, data.roomName);
                        const result: object = {
                            guest_token: move.guest_token,
                            invited_points: updateRoom.invited_points,
                            owner_points: updateRoom.owner_points,
                            result: move.result,
                        };

                        this.io.to(data.roomName).emit('round end', result);
                        rooms[data.roomName] = []; // Clean moves
                    }
                } catch (error) {
                    console.log(">> " + error);
                }
            });
        });

        return this;
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.set('view engine', 'ejs')
        this.app.use(express.static('public'))
        this.app.use(cookieParser());
        this.app.use(cookiesMiddleware());
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller: IController) => {
            this.app.use('/', controller.router);
        });
    }

    private initializeSocketServer(server: http.Server) {
        this.io = new Server(server, { cors: { origin: "*" } }); // Allow all
    }
}
