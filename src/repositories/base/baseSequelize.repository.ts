import {
    errorService,
} from '@/services'
import { BaseError } from '@/services/errors'
import { sequelize } from '@/models/base.sequelize'
import { FindOptions, CreateOptions, DestroyOptions, CreationAttributes } from 'sequelize'
import { IErrorResponse } from '@/interfaces'
import { config } from '@/configs'
import { ModelCtor, Model } from 'sequelize-typescript'
import * as _ from 'lodash'


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
export class BaseSequelizeRepository<T extends Model<T, T>> {
    constructor(model: ModelCtor<T>) {
        this.model = model
    }
    model: ModelCtor<T>
    async transaction() {
        return await sequelize.transaction()
    }

    async findAndCountAll(option: ICrudOptionSequelize = {}) {
        return await this.model.findAndCountAll(this.applyFindOptions(option))
    }
    async findOne(option: ICrudOptionSequelize = {}) {
        return await this.model.findOne(this.applyFindOptions(option))

    }
    async create(params: any, option: ICrudOptionSequelize = {}) {
        return await this.model.create(params, this.applyCreateOptions(option))

    }
    async updateById(id: any, params: any, option: ICrudOptionSequelize = {}) {
        const item = await this.exec(this.model.findOne({ where: { id } }), { allowNull: false })
        await this.exec(item.update(params))
        return await this.findOne(option)
    }

    async bulkUpdate(params: {
        items: CreationAttributes<T>[],
        updateOnDuplicateBy: string[]
    }, option: ICrudOptionSequelize = {}) {

        const { items, updateOnDuplicateBy } = params
        let updateOnDuplicate: any[] = []
        const updatedAt = sequelize.fn('NOW');
        const updatedAtUnixTimestamp = new Date().getTime();
        items.forEach((item: any) => {
            item.updatedAt = updatedAt;
            item.updatedAtUnixTimestamp = updatedAtUnixTimestamp;
            updateOnDuplicate = [...updateOnDuplicate, ...Object.getOwnPropertyNames(item)];
        });
        const attributes = Object.getOwnPropertyNames(this.model.getAttributes());
        updateOnDuplicate = _.remove(updateOnDuplicate, (item: string) => {
            return !updateOnDuplicateBy.includes(item) && attributes.includes(item);
        });

        const result = await this.model.bulkCreate(items, { updateOnDuplicate })
        option.where.id = { $in: result.map(item => item.id) }

        return await this.model.findAndCountAll<T>(option);
    }

    async delete(option: ICrudOptionSequelize) {
        const item = await this.exec(this.findOne(option), { allowNull: false })
        return await this.exec(item.destroy())
    }
    async exec(promise: any, option: ICrudExecOption = { allowNull: true }) {
        try {
            const result = await promise

            if ((result === undefined || result === null) && !option.allowNull)
                if (option.errorCustom) {
                    throw errorService.database.errorCustom(option.errorCustom)
                } else {
                    throw errorService.database.recordNotFound()
                }

            return result;
        } catch (err: any) {
            if (err instanceof BaseError || err.options) throw err
            if (config.server.debug) {
                if (err.errors && err.errors[0]) {
                    throw errorService.database.queryFail(err.errors[0].message)
                } else {
                    throw errorService.database.queryFail(err.message)
                }
            } else {
                throw errorService.router.somethingWentWrong()
            }
        }
    }
    applyFindOptions(option: ICrudOptionSequelize = {
        limit: config.database.defaultPageSize,
        offset: 0
    }) {
        const query: FindOptions<T> = {
            where: option.where ?? {},
            order: option.order ?? [],
            include: option.include ?? [],
            paranoid: option.paranoid ?? true,
            //  distinct: option.distinct
        }
        if (option.attributes) {
            query.attributes = option.attributes
        }
        if (typeof option.limit == 'number') {
            query.limit = option.limit
        } else if (!option.limit) {
            query.limit = config.database.defaultPageSize
        }
        if (typeof option.offset == 'number') {
            query.offset = option.offset
        } else if (!option.limit) {
            query.offset = 0
        }


        return query
    }
    applyCreateOptions(option: ICrudOptionSequelize = {}) {
        const query: CreateOptions = {
            transaction: option.transaction
        }
        return query
    }
    applyDestroyOptions(option: ICrudOptionSequelize = {}) {
        const query: DestroyOptions = {
            where: option.where,

            transaction: option.transaction
        }
        if (typeof option.limit == 'number') {
            query.limit = option.limit
        } else if (!option.limit) {
            query.limit = config.database.defaultPageSize
        }
        return query
    }


}
