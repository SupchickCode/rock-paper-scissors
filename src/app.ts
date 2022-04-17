import express from "express";
import cookieParser from "cookie-parser";
import * as bodyParser from 'body-parser';
import IController from './interface/controller.interface';
import cookiesMiddleware from './middleware/cookies.middleware';
import { Client } from 'pg';

export default class App {
    public app: express.Application;
    public port: number | string;
    public pg_config: object;

    constructor(controllers: IController[], port: number | string) {
        this.app = express();
        this.port = port;
        this.pg_config = {
            host: process.env.PG_HOST,
            user: process.env.PG_USER,
            port: process.env.PG_PORT,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE
        };

        this.initializeConnectionToDB();
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

    private async initializeConnectionToDB() {
        try {
            const client = new Client(this.pg_config);

            await client.connect();
        } catch (error) {
            console.log('DB connected errors >> ' + error);
        }
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}
