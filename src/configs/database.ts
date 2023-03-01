require('dotenv').config()
export const databaseConfig = {
  development: {
    username: process.env["DEV_DB_USER"] || "",
    password: process.env["DEV_DB_PASS"] || "",
    database: process.env["DEV_DB_NAME"] || "",
    host: process.env["DEV_DB_HOST"] || "",
    timezone: process.env["DEV_DB_TIMEZONE"] || "+00:00",
    port: process.env["DEV_DB_PORT"] || 5432,
    dialect: "postgresql",
    // ssl: {
    //       require: true
    // },
    // dialectOptions: {
    //   ssl: {
    //     require: true
    //   }
    // }
  },
  production: {
    username: process.env["PROD_DB_USER"] || "",
    password: process.env["PROD_DB_PASS"] || "",
    database: process.env["PROD_DB_NAME"] || "",
    timezone: process.env["PROD_DB_TIMEZONE"] || "+00:00",
    host: process.env["PROD_DB_HOST"] || "",
    port: process.env["PROD_DB_PORT"] || 5432,
    ssl: false,
    dialect: "postgresql",
    // Setup For GCLOUD
    // dialectOptions: {
    //   socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
    // },`
    // ssl:true,
    // dialectOptions:{
    //    ssl:{
    //       require:true
    //    }
    // }
  }
}