import { BaseMiddleware } from "./base.middleware";
import * as express from 'express'
import { Request, Response } from "@/controllers/base/base.controller";


export class ParseRequestMiddleware extends BaseMiddleware {
    override async use(req: Request, _res: Response, next: express.NextFunction) {
        const ipv4 = req.socket.remoteAddress || req.ip;
        req.body.ipv4 = ipv4
        req.ipv4 = ipv4
        next();
    }

}