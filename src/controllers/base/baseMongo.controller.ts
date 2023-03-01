

import { EDefaultApi } from '@/enums/defaultApi.enum';
import { BaseMongoService } from '@/services';
import { BaseController, Request, Response } from './base.controller'

export class BaseMongoController<T extends BaseMongoService<any>> extends BaseController {
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
      this.router.get('/:_id', this.route(this.getItem));
    if (!ignoreDefaultApi.includes(EDefaultApi.CREATE))
      this.router.post('/', this.authMiddlewares(), this.route(this.create));

    if (!ignoreDefaultApi.includes(EDefaultApi.UPDATE_ONE_BY_ID))
      this.router.put('/:_id', this.authMiddlewares(), this.route(this.update));
    if (!ignoreDefaultApi.includes(EDefaultApi.DELETE_ONE_BY_ID))
      this.router.delete('/:_id', this.authMiddlewares(), this.route(this.delete));
  }
  customRouting() { }


  async getList(req: Request, res: Response) {
    const option = req.queryInfoMongo;
    const result = await this.service.getList(option);
    this.onSuccessAsList(res, result, undefined, req.queryInfoMongo);
  }
  async getItem(req: Request, res: Response) {
    const { _id } = req.params;
    req.queryInfoMongo = {
      ...req.queryInfoMongo
    }
    req.queryInfoMongo.filter._id = _id
    const result = await this.service.getItem(req.queryInfoMongo);
    this.onSuccess(res, result);
  }
  async create(req: Request, res: Response) {
    const { body, queryInfoMongo } = req
    const result = await this.service.create(body, queryInfoMongo);
    this.onSuccess(res, result);
  }
  async update(req: Request, res: Response) {
    const { body, queryInfoMongo } = req
    const { _id } = req.params;
    req.queryInfoMongo = {
      ...req.queryInfoMongo
    }
    req.queryInfoMongo.filter._id = _id;
    const result = await this.service.update(body, queryInfoMongo);
    this.onSuccess(res, result);
  }
  async delete(req: Request, res: Response) {
    const { _id } = req.params;
    req.queryInfoMongo = {
      ...req.queryInfoMongo
    }
    req.queryInfoMongo.filter._id = _id
    const result = await this.service.delete(req.queryInfoMongo);
    this.onSuccess(res, result);
  }


}
