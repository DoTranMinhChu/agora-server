

import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseEntity } from "./base/base.entity";
import { UserEntity } from "./user.entity";


@Table({ tableName: 'refresh_token_user' })
export class RefreshTokenUserEntity extends BaseEntity<RefreshTokenUserEntity> {


    @ForeignKey(() => UserEntity)
    @Column({ field: 'user_id', type: DataType.UUID })
    userId!: string

    @BelongsTo(() => UserEntity)
    user!: UserEntity;

    @Column({ field: 'refresh_token', allowNull: true, unique: true, type: DataType.STRING })
    refreshToken!: string



}

