import * as fs from 'fs'
import * as path from 'path'
import * as express from 'express'
import { utilService } from '@/services'

const route = express.Router()
function mapRouter(pathName: string, currentPathApi = '') {
  const mainPathNames = fs.readdirSync(pathName);
  for (const mainPathName of mainPathNames) {
    const mainPath = path.join(pathName, mainPathName);
    if (['/base'].includes(currentPathApi)) continue;
    if (fs.lstatSync(mainPath).isDirectory()) {
      mapRouter(mainPath, `${currentPathApi}/${mainPathName}`)
    } else {
      try {
        const subRoute = express.Router();
        Object.values(require(mainPath)).forEach((Controller: any) => {
          const controller = new Controller();
          let path = controller.path

          if (controller.service && !controller.path) {
            path = utilService.camelCaseToSnakeCase(`${controller.constructor.name}`.replace('Controller', ''))
          }
          if (path) {
            subRoute.use(`/${path}`, controller.router)
            route.use(currentPathApi, subRoute)
          }
        })


      } catch (_err: any) {

      }
    }
  }
}
mapRouter(__dirname)

export default route