import * as express from 'express';

export default interface IController {
    path : string;
    router : express.Router;
    service : object;

    intializeRoutes() : void;
}
