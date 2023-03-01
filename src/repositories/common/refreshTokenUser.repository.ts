import { RefreshTokenUserEntity } from "@/models/entities";
import { BaseSequelizeRepository } from "../base/baseSequelize.repository";

export class RefreshTokenUserRepository extends BaseSequelizeRepository<RefreshTokenUserEntity>{
    constructor() {
        super(RefreshTokenUserEntity)
    }
    async findOneByUserId(userId: string): Promise<RefreshTokenUserEntity | null> {
        return await this.model.findOne({ where: { userId } })
    }

    async findOneByRefreshToken(refreshToken: string): Promise<RefreshTokenUserEntity | null> {
        return await this.model.findOne({ where: { refreshToken } })
    }
}