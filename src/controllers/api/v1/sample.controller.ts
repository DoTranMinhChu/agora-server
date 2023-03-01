import { BaseMongoController } from "@/controllers/base/baseMongo.controller";
import { sampleService } from "@/services";





export class SampleController extends BaseMongoController<typeof sampleService> {
    constructor() {
        super(sampleService);
        this.path = 'sample'
    }
}
