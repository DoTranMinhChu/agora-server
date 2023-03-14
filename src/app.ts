import express, { Express, Request, Response } from 'express';
import api from "@/controllers/router";
import { loggerMiddleware, morganMiddleware, parseRequestMiddleware, queryMongoMiddleware, querySequelizeMiddleware } from './middlewares';
import { config } from './configs';
import * as path from "path";
import * as cors from "cors";
export class App {
    constructor() {
        this.app = express();
        this.middleware();
        this.app.use(cors.default({ origin: '*', exposedHeaders: ['access-token'] }));
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.set('view engine', 'ejs');

        this.app.use(loggerMiddleware.run())
        this.app.use(morganMiddleware.run())


        this.app.use('/static', express.static(path.join(__dirname, "../public")));
        this.app.get('/policy', (_req: Request, res: Response) => {

            var links = [
                { href: 'https://www.facebook.com/', text: 'Facebook' },
                { href: 'https://viblo.asia/', text: 'Viblo' },
            ];
            res.render('policy', {
                links
            });
        });
        this.app.get('/', (_req: Request, res: Response) => {
            res.render('index');
        });

        this.app.use(api);

    }
    public app: Express;

    private middleware() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(parseRequestMiddleware.run());
        this.app.use(queryMongoMiddleware.run());
        this.app.use(querySequelizeMiddleware.run());
    }

    public init(port = config.server.port) {
        this.app.listen(port, () => {
            return console.log(`Express is listening at http://localhost:${port}`);
        });
    }

}



