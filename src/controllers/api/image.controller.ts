
import * as fs from "fs";
import { join } from "path";
import { imageService, utilService } from "@/services";
import { Request, Response } from "express";
import { config } from "@/configs";
import { BaseController } from "@/controllers/base/base.controller";

const pathImages = config.server.path_images
export class ImageController extends BaseController {
    constructor() {
        super();
        this.customRouting()
        this.path = 'image'

    }
    customRouting() {
        const multer = require("multer");
        var storage = multer.diskStorage({
            destination: function (_req: Request, _file: any, cb: any) {
                if (!fs.existsSync(pathImages)) {
                    fs.mkdirSync(pathImages);
                }
                cb(null, pathImages)
            },
            filename: function (_req: Request, file: any, cb: any) {
                cb(null, utilService.revokeFileName(file.originalname))
            }
        })

        const upload = multer({ storage: storage })

        this.router.get('/:filename', this.route(this.getImage));
        this.router.post('/', upload.array("files"), this.route(this.upload));
    }

    async getImage(req: Request, res: Response) {
        const { filename } = req.params;
        const pathFileName = join(pathImages, decodeURIComponent(`${filename}`))
        fs.readFile(pathFileName, function (err, data) {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.json({
                    "code": 500,
                    "type": "database_exception_query_fail",
                    "message": "Image does not exist"
                });
                res.end();
            } else {
                res.writeHead(200, { "Content-Type": "image/png,image/gif" });
                res.end(data);
            }
        });
    }
    async upload(req: Request, res: Response) {

        const pathnames = await imageService.upload(req);
        this.onSuccess(res, pathnames);
    }
}
