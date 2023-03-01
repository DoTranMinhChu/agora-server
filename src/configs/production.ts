import { databaseConfig } from "./database"

require('dotenv').config()


export default {
    server: {
        host: process.env["PROD_HOST_NAME"],
        protocol: 'http',
        debug: true,
        name: 'SERVER NAME',
        port: process.env["PROD_PORT"] || 8765,
        secret: process.env["PROD_SERVER_SECRET"] || "PROD_SERVER_SECRET",
        is_localhost: process.env["PROD_IS_LOCALHOST"],
        logger: process.env["PROD_LOGGER"] ? JSON.parse(`${process.env["PROD_LOGGER"]}`) : [],
        path_images: 'images',
        path_files: 'files'
    },
    socket: {
        port: process.env["PROD_PORT_SOCKET"] || 8686
    },
    database: {
        mongo: process.env["PROD_MONGODB_URI"],
        sessionSecret: process.env["PROD_SESSION_SECRET"],
        defaultPageSize: 50,
        sql: databaseConfig.production
    },
    firebase: {
        title: process.env["FIREBASE_TITLE"],
        type: process.env["FIREBASE_TYPE"],
        project_id: process.env["FIREBASE_PROJECT_ID"],
        private_key_id: process.env["FIREBASE_PRIVATE_KEY_ID"],
        private_key: process.env["FIREBASE_PRIVATE_KEY"]?.replace(/\\n/g, '\n'),
        client_email: process.env["FIREBASE_CLIENT_EMAIL"],
        client_id: process.env["FIREBASE_CLIENT_ID"],
        auth_uri: process.env["FIREBASE_AUTH_URI"],
        token_uri: process.env["FIREBASE_TOKEN_URI"],
        auth_provider_x509_cert_url: process.env["FIREBASE_AUTH_PROVIDER_X509_CERT_URL"],
        client_x509_cert_url: process.env["FIREBASE_CLIENT_X509_CERT_URL"]
    },
    firebaseDbURL: process.env["FIREBASE_DATABASE_URL"],
    agora: {
        app_id: process.env["PROD_AGORA_APP_ID"] || "PROD_AGORA_APP_ID",
        app_certificate: process.env["PROD_AGORA_APP_CERTIFICATE"] || "DEV_AGORA_APP_CERTIFICATE"
    }
}
