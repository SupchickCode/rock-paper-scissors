import express from "express";
import cookieParser from "cookie-parser";
import * as bodyParser from 'body-parser';
import IController from './interface/controller.interface';
import cookiesMiddleware from './middleware/cookies.middleware';
import { Client } from 'pg';
import databaseConfig from "./config/database";

export default class App {
    public app: express.Application;
    public port: number | string;
    public databaseConfig: object;

    constructor(controllers: IController[], port: number | string) {
        this.app = express();
        this.port = port;
        this.databaseConfig = databaseConfig;

        // this.initializeConnectionToDB();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
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

    // private async initializeConnectionToDB() {
    //     try {
    //         const client = new Client(this.databaseConfig);

    //         await client.connect();
    //     } catch (error) {
    //         console.log('DB connected errors >> ' + error);
    //     }
    // }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}
