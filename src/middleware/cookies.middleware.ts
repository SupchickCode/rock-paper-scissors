import { Request, Response, NextFunction } from 'express';
import { getRandomToken } from '../helper/string.helper';

const cookiesMiddleware = () => (request: Request, response: Response, next: NextFunction) => {
    if (!request.cookies.guest_token) {
        response.cookie('guest_token', getRandomToken(),
            { maxAge: 604800 * 60, httpOnly: true }); // one week
    }

    next();
}

export default cookiesMiddleware;