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
        this.io = new Server(this.server, { cors: { origin: "*" } }); // Allow all

        this.initializeMiddlewares();
        this.initializeControllers(controllers);

        this.listenSocket();
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

    public listenSocket(): this {
        this.io.on('connection', (socket) => {
            console.log(socket.id);
            console.log(`IO is running`);
        });

        return this;
    }

    public listen(): this {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });

        return this;
    }
}
