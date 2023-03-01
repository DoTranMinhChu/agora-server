import { Request, Response } from "@/controllers/base/base.controller";
import { BaseSequelizeController } from "@/controllers/base/baseSequelize.controller";
import { userService } from "@/services";



export class UserController extends BaseSequelizeController<typeof userService> {
    constructor() {
        super(userService);
        this.path = 'user'
    }
    override customRouting(): void {
        this.router.get('/info', this.authMiddlewares(), this.route(this.getInfo));
    }

    async getInfo(req: Request, res: Response) {
        const option = {
            ...req.queryInfoSequelize,
            where: {
                ...req.queryInfoSequelize?.where,
                id: req.tokenInfo?.id
            }
        };

        const result = await this.service.getItem(option)
        this.onSuccess(res, result)
    }
}
