

import { config } from '@/configs'
import { DocumentQuery } from '@/models'
import { BaseMongoRepository } from '@/repositories/base/baseMongo.repository'
import { errorService } from '..'
import { BaseError } from '../errors'
export interface ICrudOptionMongo {
  filter?: any
  limit?: number
  offset?: number
  fields?: string[]
  populates?: any
  lean?: boolean
}
export interface ICrudExecOption {
  allowNull?: boolean
}
export class BaseMongoService<T extends BaseMongoRepository<any>> {
  constructor(repository: T) {
    this.repository = repository
  }
  repository: T
  async getList(option: ICrudOptionMongo = {
    limit: config.database.defaultPageSize,
    offset: 0
  }) {
    return await this.repository.exec(
      this.repository.findAndCountAll(option)
    )
  }
  async getItem(option: ICrudOptionMongo = {
    limit: config.database.defaultPageSize,
    offset: 0
  }) {
    return await this.repository.exec(
      this.repository.findOne(option)
      , { allowNull: false })
  }
  async create(params: any, option: ICrudOptionMongo = {
    limit: config.database.defaultPageSize,
    offset: 0
  }) {
    return await this.repository.exec(
      this.repository.create(params, option)
    )
  }
  async update(params: any, option: ICrudOptionMongo = {
    limit: config.database.defaultPageSize,
    offset: 0
  }) {
    return await this.repository.exec(this.repository.update(params, option), { allowNull: false });
  }
  async delete(option: ICrudOptionMongo = {
    limit: config.database.defaultPageSize,
    offset: 0
  }) {
    return await this.repository.exec(this.repository.destroy(option), { allowNull: false })
  }
  async exec(promise: Promise<any> | any, option: ICrudExecOption = { allowNull: true }) {
    try {
      let result;
      if (promise.hasOwnProperty("exec")) {
        result = await promise.exec();
      } else {
        result = await promise;
      }
      if ((result === undefined || result === null) && !option.allowNull)
        throw errorService.database.recordNotFound()
      return result;
    } catch (err: any) {
      if (err instanceof BaseError) throw err
      if (config.server.debug) {
        if (err.errors && err.errors[0]) {
          throw errorService.database.queryFail(err.errors[0].message)
        } else {
          throw errorService.database.queryFail(err.message)
        }
      } else {
        throw err
      }
    }
  }

  applyQueryOptions(query: DocumentQuery, option: ICrudOptionMongo) {
    if (option.filter) query.where(option.filter)
    if (option.limit) query.limit(option.limit)
    if (option.offset) query.skip(option.offset)
    if (option.fields) {
      if (option.fields?.includes("$all")) {
        query.select(Object.keys(query.model.schema.obj))
      } else {
        query.select(option.fields)
      }
    }
    if (option.populates) {
      for (const populate of option.populates) {
        query.populate(populate)
      }
    }
    if (option.lean) query.lean()
    return query
  }
}
