import { join } from "path";
import { unlinkSync, writeFileSync, readFileSync } from "fs";
import { config } from "@/configs";
import sharp from "sharp"
import { utilService } from "..";
const gifResize = require('@gumlet/gif-resize')

const pathImages = config.server.path_images
export class ImageService {

    async upload(req: any): Promise<string[]> {
        let files = req.files
        let { ...resize } = req.body;
        const pathnames = []
        let listFiles = []
        if (files?.length) {
            listFiles = [...files]
        } else {
            listFiles.push(files)
        }
        for (const file of listFiles) {
            const { destination, filename, path } = file;
            let newFilename = filename
            if (!(Object.keys(resize).length === 0 && resize.constructor === Object)) {
                const resizeOption: any = {}
                Object.keys(resize).forEach(item => {
                    const value = resize[item]
                    resizeOption[item] = +value ? +value : value
                })
                if (resizeOption.height && !resizeOption.width) {
                    resizeOption.width = +resizeOption.height
                }
                if (resizeOption.width && !resizeOption.height) {
                    resizeOption.height = +resizeOption.width
                }
                const oldPathName = join(destination, filename)
                newFilename = utilService.revokeFileName(filename, false, resizeOption)
                const newPathName = join(pathImages, newFilename)
                if (file.mimetype?.includes("gif")) {
                    writeFileSync(newPathName, await gifResize({
                        ...resizeOption
                    })(readFileSync(oldPathName)))
                } else {

                    await sharp(oldPathName).resize({
                        ...resizeOption
                    }).toFile(newPathName);

                }

                setTimeout(() => {
                    // unlinkSync(newPathName)
                    unlinkSync(path)
                }, 0)
            }

            const hostname = config.server.host ?? req.headers.host
            const result = `${req.protocol}://${join(hostname, join('api/image', encodeURIComponent(newFilename))).replace(/\\/g, '/')}`

            pathnames.push(result)
        }

        return pathnames

    }

}