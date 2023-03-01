
import { config } from "@/configs";
import * as mongoose from "mongoose"


mongoose.set('strictQuery', false);

const connectMongo = async () => {
  return mongoose.connect(`${config.database.mongo}`)
    .then(async () => {
      console.log('mongoose.connect ======> Successfully');
    }).catch((err: any) => {
      console.log('mongoose.connect ======> ', err.message);
    })
}
export type Model = mongoose.Model<any, {}, {}, any>
export type DocumentQuery = mongoose.Query<any, any>
export {
  mongoose,
  connectMongo
}