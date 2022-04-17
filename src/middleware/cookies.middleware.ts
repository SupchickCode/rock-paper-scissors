import {Request, Response, NextFunction} from 'express';

const getRandomStr = (): string => {
    return (Math.random() + 1).toString(36).substring(2);
}

const getRandomToken = (): string => {
    return getRandomStr() + getRandomStr() + getRandomStr();
}

const cookiesMiddleware = () => (request: Request, response: Response, next: NextFunction) => {
    if (!request.cookies.guest_token) {
        response.cookie('guest_token', getRandomToken(),
            { maxAge: 900000, httpOnly: true });
    }

    next();
}

export default cookiesMiddleware;