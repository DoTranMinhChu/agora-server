import { AllowNull, BeforeCreate, BeforeDestroy, BeforeUpdate, Column, CreatedAt, DataType, Default, DeletedAt, Model, PrimaryKey, UpdatedAt } from "sequelize-typescript";


export class BaseEntity<T extends Model> extends Model<T, T>  {

    @PrimaryKey
    @AllowNull
    @Default(DataType.UUIDV4)
    @Column({
        field: 'id',
        type: DataType.UUID
    })
    override id!: string;


    @Column({ field: 'created_at_unix_timestamp', type: DataType.BIGINT })
    createdAtUnixTimestamp!: number;

    @Column({ field: 'updated_at_unix_timestamp', type: DataType.BIGINT })
    updatedAtUnixTimestamp!: number;


    @Column({ field: 'deleted_at_unix_timestamp', type: DataType.BIGINT })
    deletedAtUnixTimestamp!: number;

    @CreatedAt
    @Column({ field: 'created_at', allowNull: false, type: DataType.DATE })
    override createdAt!: Date

    @UpdatedAt
    @Column({ field: 'updated_at', allowNull: false, type: DataType.DATE })
    override updatedAt!: Date

    @DeletedAt
    @Column({ field: 'deleted_at', type: DataType.DATE })
    override deletedAt!: Date;

    @BeforeCreate
    static beforeCreateHook(instance: BaseEntity<Model>, _options: any): void {
        const now = new Date().getTime();
        instance.createdAtUnixTimestamp = now;
        instance.updatedAtUnixTimestamp = now;
    }

    @BeforeUpdate
    static beforeUpdateHook(instance: BaseEntity<Model>, _options: any): void {
        instance.updatedAtUnixTimestamp = new Date().getTime();
    }

    @BeforeDestroy
    static beforeDestroyHook(instance: BaseEntity<Model>, _options: any): void {
        instance.deletedAtUnixTimestamp = new Date().getTime()
    }

    $eq!: any
    $ne!: any
    $gte!: any
    $gt!: any
    $lte!: any
    $lt!: any
    $not!: any
    $in!: any[]
    $notIn!: any[]
    $is!: any
    $like!: any
    $notLike!: any
    $iLike!: any
    $notILike!: any
    $regexp!: any
    $notRegexp!: any
    $iRegexp!: any
    $notIRegexp!: any
    $between!: any[]
    $notBetween!: any[]
    $overlap!: any[]
    $contains!: any[]
    $contained!: any[]
    $adjacent!: any[]
    $strictLeft!: any[]
    $strictRight!: any[]
    $noExtendRight!: any[]
    $noExtendLeft!: any[]
    $and!: any[]
    $or!: any[]
    $any!: any[]
    $all!: any[]
    $values!: any[] /** Missing typings **/
    $col!: any

}

