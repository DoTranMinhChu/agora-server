import { BaseMiddleware } from "./base.middleware";
import * as express from 'express';
import { Request, Response } from "@/controllers/base/base.controller";
import { errorService, tokenService } from "@/services";
import { ERole } from "@/enums/role.enum";

const HEADERS = "authorization";
export class RoleMiddleware extends BaseMiddleware {
    override async use(req: Request, _res: Response, next: express.NextFunction, option?: ERole[]) {
        if (!req.tokenInfo) {
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
            } else {
                throw errorService.auth.unauthorized();
            }
        }
        if (!option?.length) {
            const checkRoles = req.tokenInfo.roles.some((value: ERole) =>
                option?.includes(value)
            )
            if(!checkRoles){
                throw errorService.auth.unauthorized();
            }
        }
        next();
    }

}