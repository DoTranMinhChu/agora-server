import { BaseMiddleware } from "./base.middleware";
import * as express from 'express';
import * as _ from 'lodash'
import { Request, Response } from "@/controllers/base/base.controller";
import moment from "moment";
const morgan = require('morgan')
export class MorganMiddleware extends BaseMiddleware {
    override async use(req: Request, res: Response, next: express.NextFunction) {
        morgan.token('status', (_req: Request, res: Response) => { return res.statusCode })
        morgan.token('message', (_req: Request, res: Response) => { return res.statusMessage })
        morgan.token('url', (req: Request, _res: Response) => { return decodeURIComponent(req.originalUrl) })
        morgan.token('timestamp', (_req: Request, _res: any) => { return moment().format("YYYY-MM-DD HH:mm:ss ZZ") })
        morgan.token('ip', (req: Request, _res: any) => { return req.ip })
        return morgan('[:timestamp] [:ip] :method - :url [:status - :message]')(req, res, next)
    }

}