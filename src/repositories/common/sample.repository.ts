import { SampleSchema } from "@/models/collections";
import { BaseMongoRepository } from "../base/baseMongo.repository";


export class SampleRepository extends BaseMongoRepository<typeof SampleSchema>{
    constructor() {
        super(SampleSchema)
    }
}