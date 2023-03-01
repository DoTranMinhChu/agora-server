import { Request, Response } from '@/controllers/base/base.controller'
import { IHLErrorResponse } from '@/interfaces'
import { errorService } from '@/services'
import * as express from 'express'

export class BaseMiddleware {
    onError(res: Response, error: any) {
        if (!error.options) {
            const err = errorService.router.somethingWentWrong()
            res.status(err.options.code).json(err.options)
        } else {
            res.status(error.options.code).json(error.options)
        }
    }
    run(option?: any) {
        return (req: Request, res: Response, next: express.NextFunction) => this.use
            .bind(this)(req, res, next, option)
            .catch((error: any) => {
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
                    this.onError(res, error)
                }
                this.onError(res, error)
            })
    }
    async use(_req: Request, _res: Response, next: express.NextFunction, _option?: any) {
        next()
    }
}