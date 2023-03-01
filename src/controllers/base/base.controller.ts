
import * as express from 'express';
import { IHLErrorResponse } from '../../interfaces';
import { errorService, ICrudOptionMongo, ICrudOptionSequelize } from '../../services';
import * as _ from 'lodash';
import { config } from '@/configs';
import { IAccessToken } from '@/interfaces/auth/accessToken.interface';
import { authMiddleware, authOrUnAuthMiddleware, roleMiddleware } from '@/middlewares';
import { ERole } from '@/enums/role.enum';


export interface Request extends express.Request {
    ipv4?: string,
    queryInfoSequelize?: ICrudOptionSequelize,
    queryInfoMongo?: ICrudOptionMongo
    tokenInfo?: IAccessToken,
    [x: string]: any
}
export interface Response extends express.Response {
    [x: string]: any
}
export interface IValidateSchema {
    type?: string | string[],
    properties?: IValidateSchemaProperties
    additionalProperties?: boolean
    required?: string[]
    uniqueItems?: boolean
    minItems?: number
    items?: IValidateSchema
    [x: string]: any
}
export interface IValidateSchemaProperties {
    [x: string]: IValidateSchema
}

export class BaseController {
    constructor() {
        this.router = express.Router();
    }
    path: string | undefined;
    router: express.Router
    onError(res: Response, error: any) {
        // Raven.captureException(error);
        if (!error.options) {
            console.log("UNKNOW ERROR", error)
            const err = errorService.router.somethingWentWrong()
            res.status(err.options.code).json(err.options)
        } else {
            res.status(error.options.code).json(error.options)
        }
    }


    onSuccess(res: Response, object: any = {}, extras: any = {}) {
        object = object || {}
        if (Object.keys(object).length === 0) {
            res.status(200).json({
                code: 200
            }).end()
        } else {
            res.status(200).json({
                code: 200,
                results: Object.assign({
                    object
                }, extras)
            }).end()
        }
    }

    onSuccessAsList(res: Response, objects: any = [], extras: any = {}, option: ICrudOptionMongo = {
        offset: 0, limit: config.database.defaultPageSize
    }) {
        if (objects.toJSON) {
            objects = objects.toJSON()
        }
        const offset = option.offset ?? 0
        const limit = option.limit ?? config.database.defaultPageSize
        const page = _.floor(offset / limit) + 1
        res.json({
            code: 200,
            results: Object.assign({
                objects
            }, extras),
            pagination: {
                'current_page': page,
                'next_page': page + 1,
                'prev_page': page - 1,
                'limit': option.limit
            }
        })
    }

    route(func: (req: Request, rep: Response) => Promise<any>) {
        return (req: Request, res: Response) => func
            .bind(this)(req, res)
            .catch((error: any) => {
                console.log('error ===> ', error.options)
                if (!error.options) {
                    console.log("UNKNOW ERROR", error)
                    error.options = errorService.router.somethingWentWrong().options
                }
                try {
                    const hl = req.query['hl']
                    const message: IHLErrorResponse = error.options.message
                    const translateMessage = message[`${hl}`] || message.en
                    if (typeof translateMessage === 'string') {

                        error.options.message = translateMessage

                        if (translateMessage == "") {
                            error.options.message = message.en
                        }

                    }
                } catch (e) {

                }
                this.onError(res, error)



            })
    }

    authMiddlewares(): any[] {
        return [authMiddleware.run()];
    }

    authOrUnAuthMiddlewares(): any[] {
        return [authOrUnAuthMiddleware.run()];
    }

    roleMiddlewares(option: ERole[]): any[] {
        return [roleMiddleware.run(option)]
    }
}