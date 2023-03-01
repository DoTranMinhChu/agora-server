import { AuthMiddleware } from "./auth.middleware";
import { AuthOrUnAuthMiddleware } from "./authOrUnAuth.middleware";
import { LoggerMiddleware } from "./logger.middleware";
import { MorganMiddleware } from "./morgan.middleware";
import { ParseRequestMiddleware } from "./parseRequest.middleware";
import { QueryMongoMiddleware } from "./queryMongo.middleware";
import { QuerySequelizeMiddleware } from "./querySequelize.middleware";
import { RoleMiddleware } from "./role.middleware";


const queryMongoMiddleware = new QueryMongoMiddleware();
const querySequelizeMiddleware = new QuerySequelizeMiddleware();
const loggerMiddleware = new LoggerMiddleware();
const morganMiddleware = new MorganMiddleware();
const parseRequestMiddleware = new ParseRequestMiddleware();
const authMiddleware = new AuthMiddleware();
const authOrUnAuthMiddleware = new AuthOrUnAuthMiddleware();
const roleMiddleware = new RoleMiddleware();
export {
    querySequelizeMiddleware,
    queryMongoMiddleware,
    loggerMiddleware,
    morganMiddleware,
    parseRequestMiddleware,
    authMiddleware,
    authOrUnAuthMiddleware,
    roleMiddleware
}