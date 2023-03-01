import { EDefaultApi } from "@/enums/defaultApi.enum";
import { BaseSequelizeService } from "@/services"
import { BaseController, Request, Response } from "./base.controller"

export class BaseSequelizeController<T extends BaseSequelizeService<any>> extends BaseController {
    constructor(service: T, ignoreDefaultApi: EDefaultApi[] = []) {
        super()
        this.service = service;
        this.customRouting();
        this.defaultRouting(ignoreDefaultApi);
    }
    service: T
    defaultRouting(ignoreDefaultApi: EDefaultApi[]) {
        if (!ignoreDefaultApi.includes(EDefaultApi.FIND_ALL))
            this.router.get('/', this.route(this.getList));
        if (!ignoreDefaultApi.includes(EDefaultApi.FIND_ONE_BY_ID))
            this.router.get('/:id', this.route(this.getItem));
        if (!ignoreDefaultApi.includes(EDefaultApi.CREATE))
            this.router.post('/', this.authMiddlewares(), this.route(this.create));
        if (!ignoreDefaultApi.includes(EDefaultApi.BULK_UPDATE))
            this.router.put('/', this.authMiddlewares(), this.route(this.bulkUpdate));
        if (!ignoreDefaultApi.includes(EDefaultApi.UPDATE_ONE_BY_ID))
            this.router.put('/:id', this.authMiddlewares(), this.route(this.updateById));
        if (!ignoreDefaultApi.includes(EDefaultApi.DELETE_ONE_BY_ID))
            this.router.delete('/:id', this.authMiddlewares(), this.route(this.deleteById));
    }
    customRouting() { }


    async getList(req: Request, res: Response) {
        const option = req.queryInfoSequelize;
        const result = await this.service.getList(option);
        this.onSuccessAsList(res, result, undefined, req.queryInfoSequelize);
    }

    async getItem(req: Request, res: Response) {
        const { id } = req.params;
        req.queryInfoSequelize = {
            ...req.queryInfoSequelize
        }
        req.queryInfoSequelize.where.id = id
        const result = await this.service.getItem(req.queryInfoSequelize);
        this.onSuccess(res, result);
    }

    async create(req: Request, res: Response) {
        const { body, queryInfoSequelize } = req;
        const result = await this.service.create(body, queryInfoSequelize);
        this.onSuccess(res, result);
    }

    async updateById(req: Request, res: Response) {
        const { id } = req.params;
        req.queryInfoSequelize = {
            ...req.queryInfoSequelize
        }
        req.queryInfoSequelize.where.id = id
        const result = await this.service.update(req.body, req.queryInfoSequelize);
        this.onSuccess(res, result);
    }


    async bulkUpdate(req: Request, res: Response) {
        const { id } = req.params;
        req.queryInfoSequelize = {
            ...req.queryInfoSequelize
        }
        req.queryInfoSequelize.where.id = id
        const result = await this.service.bulkUpdate(req.body, req.queryInfoSequelize)
        this.onSuccess(res, result);
    }

    async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        req.queryInfoSequelize = {
            ...req.queryInfoSequelize
        }
        req.queryInfoSequelize.where.id = id
        const result = await this.service.delete(req.queryInfoSequelize);
        this.onSuccess(res, result);
    }


}
