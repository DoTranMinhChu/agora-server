import { sequelize } from '@/models/base.sequelize'
import { IErrorResponse } from '@/interfaces'
import { config } from '@/configs'
import * as _ from 'lodash'
import { BaseSequelizeRepository } from '@/repositories/base/baseSequelize.repository'


export interface ICrudOptionSequelize {
    where?: any
    limit?: number
    offset?: number
    scope?: string[]
    order?: any[]
    attributes?: any[]
    include?: any[]
    distinct?: boolean
    paranoid?: boolean
    transaction?: any

    [key: string]: any
}
export interface ICrudExecOption {
    allowNull?: boolean,
    errorCustom?: IErrorResponse
}
export class BaseSequelizeService<T extends BaseSequelizeRepository<any>> {
    constructor(repository: T) {
        this.repository = repository
    }
    repository: T
    async transaction() {
        return await sequelize.transaction()
    }

    async getList(option: ICrudOptionSequelize = {
        limit: config.database.defaultPageSize,
        offset: 0
    }) {
        return await this.repository.exec(
            this.repository.findAndCountAll(option)
        )
    }
    async getItem(option: ICrudOptionSequelize = {
        limit: config.database.defaultPageSize,
        offset: 0
    }) {
        return await this.repository.exec(
            this.repository.findOne(option)
            , { allowNull: false })
    }
    async create(params: any, option: ICrudOptionSequelize = {
        limit: config.database.defaultPageSize,
        offset: 0
    }) {
        return await this.repository.exec(
            this.repository.create(params, option)
        )
    }
    async update(params: any, option: ICrudOptionSequelize = {
        limit: config.database.defaultPageSize,
        offset: 0
    }) {
        const item = await this.repository.exec(this.repository.findOne({ where: { id: option.where.id } }), { allowNull: false })
        await this.repository.exec(item.update(params))
        return await this.getItem(option)
    }

    async bulkUpdate(params: {
        items: [],
        updateOnDuplicateBy: string[]
    }, option: ICrudOptionSequelize) {
        return await this.repository.exec(this.repository.bulkUpdate(params, option));
    }

    async delete(option: ICrudOptionSequelize) {
        const item = await this.repository.exec(this.getItem(option), { allowNull: false })
        return await this.repository.exec(item.destroy())
    }


}
