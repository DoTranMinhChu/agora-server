

import * as fs from "fs";
import { join } from "path";
import { fileService, utilService } from "@/services";
import { Request, Response } from "express";
import { config } from "@/configs";
import { BaseController } from "@/controllers/base/base.controller";
const pathFiles = config.server.path_files
export class FileController extends BaseController {
    constructor() {
        super();
        this.customRouting()
        this.path = 'file'

    }
    customRouting() {
        const multer = require("multer");
        var storage = multer.diskStorage({
            destination: function (_req: Request, _file: any, cb: any) {
                if (!fs.existsSync(pathFiles)) {
                    fs.mkdirSync(pathFiles);
                }
                cb(null, pathFiles)
            },
            filename: function (_req: Request, file: any, cb: any) {
                cb(null, utilService.revokeFileName(file.originalname))
            }
        })

        const upload = multer({ storage: storage })

        this.router.get('/:filename', this.route(this.getFile));
        this.router.post('/', upload.array("files"), this.route(this.upload));
    }

    async getFile(req: Request, res: Response) {
        const { filename } = req.params;
        const pathFileName = join(pathFiles, decodeURIComponent(`${filename}`))
        fs.readFile(pathFileName, function (err, data) {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.json({
                    "code": 500,
                    "type": "database_exception_query_fail",
                    "message": "File does not exist"
                });
                res.end();
            } else {
                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
                res.end(data);
            }
        });
    }
    async upload(req: Request, res: Response) {

        const pathnames = await fileService.upload(req);
        this.onSuccessAsList(res, pathnames);
    }
}
