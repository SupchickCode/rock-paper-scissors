import * as express from 'express';

interface ICookiesMiddleware {
    handle(request: express.Request, response: express.Response, next: express.NextFunction) : void;
}

class CookiesMiddleware implements ICookiesMiddleware {
    handle = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        if (!request.cookies.user_id) {
            request.cookies.user_id = 'XXX-XXX-XXXX' // uniq token
        }
    }
}

export default CookiesMiddleware;