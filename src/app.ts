import express from "express";
import * as bodyParser from 'body-parser';
import IController from './interface/controller.interface';

export default class App {
    public app: express.Application;
    public port: number | string;

    constructor(controllers: IController[], port: number | string) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.set('view engine', 'ejs')
        this.app.use(express.static('public'))
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller: IController) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}
