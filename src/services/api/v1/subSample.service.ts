
import { subSampleRepository } from "@/repositories";
import { BaseMongoService } from "@/services/base/baseMongo.service";


export class SubSampleService extends BaseMongoService<typeof subSampleRepository> {
    constructor() {
        super(subSampleRepository);
    }
}
