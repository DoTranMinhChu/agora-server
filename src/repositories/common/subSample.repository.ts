import { SubSampleSchema } from "@/models/collections";
import { BaseMongoRepository } from "../base/baseMongo.repository";


export class SubSampleRepository extends BaseMongoRepository<typeof SubSampleSchema>{
    constructor() {
        super(SubSampleSchema)
    }
}