import { BaseMongoController } from "@/controllers/base/baseMongo.controller";
import { subSampleService } from "@/services";





export class SubSampleController extends BaseMongoController<typeof subSampleService> {
    constructor() {
        super(subSampleService);
        this.path = 'sub_sample'
    }
}
