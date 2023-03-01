import { UserEntity } from "@/models/entities";
import { BaseSequelizeRepository } from "../base/baseSequelize.repository";

export class UserRepository extends BaseSequelizeRepository<UserEntity>{
    constructor() {
        super(UserEntity)
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await UserEntity.findOne({ where: { email } })
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        return await UserEntity.findOne({ where: { username } })
    }

}