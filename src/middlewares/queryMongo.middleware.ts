import { BaseMiddleware } from "./base.middleware";
import * as express from 'express'
import { Request, Response } from "@/controllers/base/base.controller";
import { config } from "@/configs";

export class QueryMongoMiddleware extends BaseMiddleware {
    override async use(req: Request, _res: Response, next: express.NextFunction) {
        const filter = this._parseFilter(req);
        //  const order = this._parseOrder(req);

        const page = parseInt(`${req?.query["page"] ?? 1}`);
        const limit = parseInt(
            `${req.query['limit'] ?? config.database.defaultPageSize}`
        );
        const offset = parseInt(`${req.query['offset']}`) || (page - 1) * limit;
        const fields = this._parseFields(req);
        const populates = this._parsePopulates(req);

        req.queryInfoMongo = {
            filter,
            limit,
            offset,
            fields,
            populates,
        };
        next();
    }

    /**
     * Filter param only accept <and> query. <or> will be supported later
     * Format: [[key, operator, value], [key, operator, value]]
     */
    _parseFilter(req: any): any {
        let filter = req.query['filter'];
        try {
            filter = JSON.parse(filter);
        } catch (ignore) {
            filter = undefined;
        }
        return filter || {};
    }

    /**
     * Format: [[key, order], [key, order]]
     */
    _parseOrder(req: any): any {
        let order = req.query['order'];
        try {
            order = JSON.parse(order);
        } catch (ignore) {
            order = undefined;
        }
        return order || [['updated_at', 'asc']];
    }
    _parseFields(req: any) {
        let fields = req.query['fields'];
        try {
            fields = JSON.parse(fields);
        } catch (ignore) {
            fields = undefined;
        }
        return fields;
    }
    _parsePopulates(req: any) {
        let populates = req.query['populates'];
        try {
            populates = JSON.parse(populates);
        } catch (ignore) {
            populates = undefined;
        }
        return populates;
    }
}