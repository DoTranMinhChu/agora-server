
import { ELoginType } from "@/enums/loginType.enum";
import { Column, DataType, Default, HasOne, Table } from "sequelize-typescript";
import { BaseEntity } from "./base/base.entity";
import { RefreshTokenUserEntity } from "./refreshTokenUser.entity";


@Table({ tableName: 'user' })
export class UserEntity extends BaseEntity<UserEntity> {


    @Column({
        field: 'name',
        type: DataType.STRING
    })
    name!: string;

    @Default(null)
    @Column({
        field: 'dob',
        type: DataType.BIGINT,
        allowNull: true,
    })
    dob!: number;

    @Column({ field: 'phone', type: DataType.STRING, unique: true })
    phone!: string;

    @Column({ field: 'username', type: DataType.STRING, unique: true })
    username!: string;

    @Column({ field: 'email', type: DataType.STRING, unique: true })
    email!: string;

    @Column({ field: 'password', type: DataType.STRING })
    password!: string;

    @Column({ field: 'login_type', type: DataType.STRING })
    loginType!: ELoginType;

    @HasOne(() => RefreshTokenUserEntity)
    refreshToken!: RefreshTokenUserEntity

}

