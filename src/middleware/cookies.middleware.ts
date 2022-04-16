import * as express from 'express';


const getRandomStr = (): string => {
    return (Math.random() + 1).toString(36).substring(2);
}

const getRandomToken = (): string => {
    return getRandomStr() + getRandomStr();
}

const cookiesMiddleware = () => (request: express.Request, response: express.Response, next: express.NextFunction) => {
    if (!request.cookies.user_id) {
        // request.cookie('user_id', getRandomToken(),
        //     { maxAge: 900000, httpOnly: true });
    }

    console.log(request.cookies.user_id);

    next();
}

export default cookiesMiddleware;