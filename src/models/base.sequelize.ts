import { config } from '@/configs'
import { Op } from 'sequelize';
import {
    Sequelize,
    SequelizeOptions,
} from 'sequelize-typescript'
import *  as entites from './entities'

const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values, /** Missing typings **/
    $col: Op.col,
};

const { host, timezone } = config.database.sql
let option: SequelizeOptions = {
    host,
    dialect: 'postgres',
    // default setting
    pool: {
        max: 100,
        min: 0,
        idle: 200000,
        acquire: 1000000
    },
    logging: false,
    timezone,
    "dialectOptions": {
        "ssl": {
            "require": false,
            "rejectUnauthorized": false
        }
    }
}

const sequelize = new Sequelize(
    config.database.sql['database'],
    config.database.sql['username'],
    config.database.sql['password'],
    {
        ...option,
        operatorsAliases
    },

)
const entitesList: any = [...Object.values(entites)];
sequelize.addModels([...entitesList]);
const connectSequelize = async () => {
    return sequelize.authenticate()
        .then(async () => {
            console.log('sequelize.connect ======> Successfully');
            await sequelize.sync({ alter: true })
            console.log('sequelize.sync ======> Successfully');
        }).catch((err: any) => {
            console.log('sequelize.connect ======> ', err.message);
        });
}
export {
    Sequelize,
    sequelize,
    connectSequelize,
    operatorsAliases
}
