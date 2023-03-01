
import { App } from "./app";
import { connectSequelize, connectMongo } from "./models";
import { scheduleService } from "./services";
import { serverSocket } from "./services/socketIO";

const app = new App();
connectSequelize();
connectMongo();
serverSocket.init(app.app);
scheduleService.run();
app.init()