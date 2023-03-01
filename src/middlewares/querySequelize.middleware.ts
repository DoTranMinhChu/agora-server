import { BaseMiddleware } from "./base.middleware";
import * as express from 'express';
import * as _ from 'lodash'
import { Request, Response } from "@/controllers/base/base.controller";
import { config } from "@/configs";
const UNLIMITED = 'unlimited'
export class QuerySequelizeMiddleware extends BaseMiddleware {
    override async use(req: Request, _res: Response, next: express.NextFunction) {
        const where = this._parsewhere(req);
        const order = this._parseOrder(req);

        const page = parseInt(`${req?.query["page"] ?? 1}`);
        const limit = req.query['limit'] == UNLIMITED ? UNLIMITED : parseInt(
            `${req.query['limit'] ?? config.database.defaultPageSize}`
        );

        const offset = limit == UNLIMITED ? undefined : parseInt(`${req.query['offset']}`) || (page - 1) * limit;
        const fields = this._parseFields(req);

        // if (fields.attributes != undefined) {
        //   fields.attributes = _.union(['id', 'created_at', 'updated_at'], fields.attributes);
        // }
        req.queryInfoSequelize = _.merge(
            {
                where,
                limit,
                page,
                offset,
                order,
            },
            fields
        );
        next();
    }
    /**
     * where param only accept <and> query. <or> will be supported later
     * Format: [[key, operator, value], [key, operator, value]]
     */
    _parsewhere(req: any): any {
        let where = req.query['where'];
        try {
            where = JSON.parse(where);
        } catch (ignore) {
            where = undefined;
        }
        return where || {};
    }
    /**
     * Where param only accept <and> query. <or> will be supported later
     * Format: [[key, operator, value], [key, operator, value]]
     */

    _parseWhere(req: any): any {
        let where = req.query['where'];

        try {
            where = JSON.parse(where);
        } catch (ignore) {
            where = undefined;
        }
        return where || {};
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
    _parseFields(req: any): any {
        let fields = req.query['fields'];
        try {
            fields = JSON.parse(fields);
        } catch (ignore) {
            fields = [];
        }
        try {
            return this._parseAttribute(fields);
        } catch (err) {
            return null;
        }
    }
    _parseAttribute(attrs: any) {
        const attributes: any[] | any = ['id', 'created_at', 'updated_at'];
        const includes: any[] = [];
        let isGetAll = false;
        let isSetParanoid = false;
        let where: any = undefined;
        _.forEach(attrs, (f) => {
            if (typeof f === 'string') {
                switch (f) {
                    case '$all':
                        isGetAll = true;
                        break;
                    case '$paranoid':
                        isSetParanoid = true;
                        break;
                    default:
                        attributes.push(f);
                }


            } else if (typeof f === 'object' && !Array.isArray(f)) {
                _.forEach(
                    f,
                    ((value: any, name: string) => {
                        switch (name) {
                            case '$where':
                                where = _.merge({}, where, value);
                                break;
                            default:
                                includes.push({
                                    [name]: value,
                                });
                        }
                    }).bind(this)
                );
            }
        });
        const include = this._parseInclude(includes);
        const result: any = {
            include: include,
            distinct: includes ? true : false,
        };
        if (where) result.where = where;
        if (!isGetAll) {
            result.attributes = attributes;
        }
        if (isSetParanoid) {
            result.paranoid = false;
        }
        if (result.attributes == undefined) {
            result.attributes = { exclude: ['password'] }
        } else {
            result.attributes = result.attributes.filter((e: string) => e !== 'password')
        }
        return result;
    }

    _parseInclude(includes: any) {
        if (includes.length === 0) return includes;

        const associates: any[] = [];
        _.forEach(
            includes,
            ((i: any) => {
                _.forEach(
                    i,
                    ((attrs: any, name: string) => {
                        const associate = Object.assign(
                            {
                                association: name,
                            },
                            this._parseAttribute(attrs)
                        );
                        associates.push(associate);
                    }).bind(this)
                );
            }).bind(this)
        );
        return associates;
    }
}