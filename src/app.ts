import express from "express";
import cookieParser from "cookie-parser";
import * as bodyParser from 'body-parser';
import IController from './interface/controller.interface';
import cookiesMiddleware from './middleware/cookies.middleware';
import { Server } from "socket.io";
import http from 'http';
import SocketService from './services/socket.service';
import ISoocketService from "./interface/socker-service.interface";

export default class App {
    public app: express.Application;
    public port: number | string;
    public io: Server;
    public server: any;
    public ioRooms: object[];
    public socketService: ISoocketService;

    constructor(controllers: IController[], port: number | string) {
        this.app = express();
        this.port = port;
        this.server = http.createServer(this.app);
        this.socketService = new SocketService();

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

        let rooms: { [key: string]: any } = {};

        this.io.on('connection', (socket) => {
            // Сейчас комнаты кажется не нужны ибо вся логика всеравно будет 
            // работаеть через объект rooms так что нужно узнать как они работаю
            socket.on('join room', (roomName) => {
                // init emply room if not exists else pass
                rooms[roomName] = [];

                socket.join(roomName);
            });

            socket.on('make move', (data, callback) => {
                rooms[data.roomName].push(data);

                if (rooms[data.roomName].length >= 2) {
                    this.socketService.findWinner(rooms, data);

                    // emit event winner

                    // clean room

                    console.log('WIN');
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
