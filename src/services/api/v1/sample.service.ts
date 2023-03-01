
import { sampleRepository } from "@/repositories";
import { BaseMongoService } from "@/services/base/baseMongo.service";


export class SampleService extends BaseMongoService<typeof sampleRepository> {
    constructor() {
        super(sampleRepository);
    }
}
