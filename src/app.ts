import express from "express";
import cookieParser from "cookie-parser";
import * as bodyParser from 'body-parser';
import IController from './interface/controller.interface';
import cookiesMiddleware from './middleware/cookies.middleware';
import { Server } from "socket.io";
import http from 'http';

export default class App {
    public app: express.Application;
    public port: number | string;
    public io: Server;
    public server: any;

    constructor(controllers: IController[], port: number | string) {
        this.app = express();
        this.port = port;
        this.server = http.createServer(this.app);

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
        this.io.on('connection', (socket) => {
            
            socket.on('joinRoom', (room) => {
                console.log('ROOM JOINED');
                socket.join(room);
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
