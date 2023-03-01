import { BaseMiddleware } from "./base.middleware";
import * as express from 'express';
import * as _ from 'lodash'
import { Request, Response } from "@/controllers/base/base.controller";

export class LoggerMiddleware extends BaseMiddleware {
    override async use(req: Request, _res: Response, next: express.NextFunction) {
        const loggers = ["method", "originalUrl", "body", "params", "ip"]
        for (const logger of loggers) {
            console.log(`[${logger.toLocaleUpperCase()}] : `, req[logger])
        }
        next();
    }

}