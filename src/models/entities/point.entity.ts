

import { Table } from "sequelize-typescript";
import { BaseEntity } from "./base/base.entity";


@Table({ tableName: 'point' })
export class PointEntity extends BaseEntity<PointEntity> {

}

