import { BaseController } from "@/controllers/base/base.controller";
import { authService, userService } from "@/services";
import { Request, Response } from "@/controllers/base/base.controller"
import { AuthService } from "@/services/api/v1/auth.service";
import { ILoginInAppRequest } from "@/interfaces/auth/loginInAppRequest.interface";
import { IRegisterUserInAppRequest } from "@/interfaces/auth/registerUserInAppRequest.interface";
import { ELoginType } from "@/enums/loginType.enum";
import { IRevokeTokenRequest } from "@/interfaces/auth/renewTokenRequest.interface";
import { ILoginSnsRequest } from "@/interfaces/auth/loginSnsRequest.interface";
export class AuthController extends BaseController {
    constructor() {
        super()
        this.service = authService
        this.path = 'auth'
        this.router.get("/info", this.authMiddlewares(), this.route(this.getInfo))
        this.router.post('/login', this.route(this.userLoginInApp));
        this.router.post('/register', this.route(this.userRegisterInApp));
        this.router.post('/token', this.route(this.revokeToken));
        this.router.post("/login_sns", this.route(this.userLoginSns));



    }
    service: AuthService
    async getInfo(req: Request, res: Response) {
        console.log("this ---> ", this)
        const id = req.tokenInfo?.id
        const result = await userService.getItem({ where: { id } });
        this.onSuccess(res, result);
    }
    async userLoginInApp(req: Request, res: Response) {
        const loginInAppRequest: ILoginInAppRequest = {
            ...req.body,
            ipv4: req.ipv4
        }
        const result = await this.service.userLoginInApp(loginInAppRequest);
        this.onSuccess(res, result);
    }

    async userRegisterInApp(req: Request, res: Response) {
        const registerInAppRequest: IRegisterUserInAppRequest = {
            ...req.body,
            loginType: ELoginType.INAPP
        }
        const result = await this.service.userRegisterInApp(registerInAppRequest);
        this.onSuccess(res, result);
    }

    async revokeToken(req: Request, res: Response) {
        const revokeTokenRequest: IRevokeTokenRequest = {
            ...req.body
        }
        const result = await this.service.revokeTokenInApp(revokeTokenRequest);
        this.onSuccess(res, result);
    }

    async userLoginSns(req: Request, res: Response) {
        const loginSnsRequest: ILoginSnsRequest = {
            ...req.body
        }
        const result = await this.service.userLoginSns(loginSnsRequest);
        this.onSuccess(res, result);
    }



}
