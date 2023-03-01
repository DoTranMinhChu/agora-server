import { config } from "@/configs"
import { mongoose, DocumentQuery } from "@/models"
import { errorService } from "@/services"
import { BaseError } from "@/services/errors"
import { ClientSession, Model } from "mongoose"

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
export class BaseMongoRepository<T extends Model<T, {}>> {
    constructor(model: T) {
        this.model = model
    }
    model: T
    async session(): Promise<ClientSession> {
        return await mongoose.startSession();
    }
    async findAndCountAll(option: ICrudOptionMongo) {
        let query = this.model.find();
        query = this.applyQueryOptions(query, option)
        query.setOptions({
            toJson: { virtual: true }
        })
        const rows = await this.exec(query);
        const count = await this.exec(query.clone().count())
        return { count, rows }
    }

    async findOne(option: ICrudOptionMongo) {
        let query = this.model.findOne()
        query = this.applyQueryOptions(query, option)
        return await this.exec(query, { allowNull: false })
    }

    async create(params: any, option: ICrudOptionMongo = {}) {
        const query = this.model.create(params)
        const result = await this.exec(query);
        option.filter._id = result._id
        return await this.findOne(option)
    }
    async update(params: any, option: ICrudOptionMongo = {}) {
        const session = await this.session();
        session.startTransaction();
        try {
            const query = this.model.findOneAndUpdate(option.filter, params, { new: true, session })
            const result = await this.exec(query)
            await session.commitTransaction();
            option.filter._id = result._id
            return await this.findOne(option);
        } catch (err) {
            await session.abortTransaction();
            throw err;
        }


    }
    async destroy(option: ICrudOptionMongo) {
        const session = await this.session();
        session.startTransaction();
        try {
            const query = this.model.findOneAndUpdate(option.filter, { deletedAt: Date.now() }, { new: true, session })
            const result = await this.exec(query)
            await session.commitTransaction();
            return result;
        } catch (err) {
            await session.abortTransaction();
            throw err;
        }
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
        if (option.lean) query.lean();
        return query
    }
}
