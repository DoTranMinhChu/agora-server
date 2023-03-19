import { databaseConfig } from "./database"

require('dotenv').config()

export default {
    server: {
        host: 'localhost',
        protocol: 'http',
        debug: true,
        name: 'LOCAL NAME',
        port: process.env["DEV_PORT"] || 8765,
        secret: process.env["DEV_SERVER_SECRET"] || "DEV_SERVER_SECRET",
        is_localhost: process.env["DEV_IS_LOCALHOST"],
        logger: process.env["DEV_LOGGER"] ? JSON.parse(`${process.env["DEV_LOGGER"]}`) : [],
        path_images: 'images',
        path_files: 'files'
    },
    socket: {
        port: process.env["DEV_PORT_SOCKET"] || 8686
    },
    database: {
        mongo: process.env["DEV_MONGODB_URI"],
        sessionSecret: process.env["DEV_SESSION_SECRET"],
        defaultPageSize: 50,
        sql: databaseConfig.development
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
        app_id: process.env["DEV_AGORA_APP_ID"] || "DEV_AGORA_APP_ID",
        app_certificate: process.env["DEV_AGORA_APP_CERTIFICATE"] || "DEV_AGORA_APP_CERTIFICATE",
        org_name: process.env["DEV_AGORA_NAME"] || "DEV_AGORA_NAME",
        app_name: process.env["DEV_AGORA_APP"] || "DEV_AGORA_APP",
        domain: process.env["DEV_AGORA_DOMAIN"] || "DEV_AGORA_DOMAIN",
        token: process.env["DEV_AGORA_TOKEN"] || "DEV_AGORA_TOKEN",
    }
}
