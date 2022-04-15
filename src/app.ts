import express from "express";
import * as bodyParser from 'body-parser';
import IController from './interface/controller.interface';

export default class App {
    public app: express.Application;
    public port: number | string;
    public mongo_url: string;

    constructor(controllers: IController[], port: number | string, mongo_url: string) {
        this.app = express();
        this.port = port;
        this.mongo_url = mongo_url;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller: IController) => {
            this.app.use('/api/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}
