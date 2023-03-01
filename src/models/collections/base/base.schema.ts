import { mongoose } from "@/models/base.mongo";
import { FlatRecord, SchemaDefinition, SchemaDefinitionType, SchemaOptions } from "mongoose";


const Schema = (
    definition: SchemaDefinition<SchemaDefinitionType<any>> | any,
    options: SchemaOptions<FlatRecord<any>, any, any, any, any> | any = {},
    Schema: mongoose.Schema = baseSchema) => {
    const schema = new mongoose.Schema(
        Object.assign({}, Schema.obj, definition),
        {
            ...options,
            timestamps: true,
            // versionKey: true,
            id: true
        }
    );

    schema.pre<any>('find', function () {
        this._conditions = { ...this._conditions, deletedAt: { $exists: false } }

    });

    schema.pre<any>('findOne', function () {
        this._conditions = { ...this._conditions, deletedAt: { $exists: false } }
    });
    schema.pre<any>('save', async function (this: any, next) {
        this['createdAt'] = Date.now();
        this['updatedAt'] = Date.now();
        next();
    });
    schema.pre('update', async function (this: any, next) {
        this['updatedAt'] = Date.now();
        await this.update()
        next();
    });
    schema.pre('remove', async function (this: any, _next) {
        this['deletedAt'] = Date.now();
        await this.update();
    });
    const collection = `${schema.get('collection')}`;
    return mongoose.models[collection] || mongoose.model(collection, schema)
}



const baseSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        require: true
    },
    updatedAt: { type: Date },
    deletedAt: { type: Date },
})

export {
    Schema,
    baseSchema
}