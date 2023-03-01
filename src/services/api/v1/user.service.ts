import { userRepository } from "@/repositories";
import { BaseSequelizeService } from "../../base/baseSequelize.service";


export class UserService extends BaseSequelizeService<typeof userRepository> {
    constructor() {
        super(userRepository);
    }
}
