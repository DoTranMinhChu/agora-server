import { BaseMiddleware } from "./base.middleware";
import * as express from 'express';
import { Request, Response } from "@/controllers/base/base.controller";
import { errorService, tokenService } from "@/services";

const HEADERS = "authorization";
export class AuthMiddleware extends BaseMiddleware {
    override async use(req: Request, _res: Response, next: express.NextFunction) {
        if (req.headers[HEADERS] !== "undefined" && typeof req.headers[HEADERS] != 'undefined') {
            const bearerHeader = req.headers[HEADERS].toString();
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            if (!bearerToken) {
                throw errorService.auth.unauthorized();
            }
            const result = tokenService.decodeToken(bearerToken);
            req.tokenInfo = result;

            // === Check blocked ====
            // const user_id = req.tokenInfo.payload.user_id;
            // req.userInfo = await userService.checkUserBlockedAndDeleted(user_id)
            //=======================
            next();
        } else {
            throw errorService.auth.unauthorized();
        }
    }

}