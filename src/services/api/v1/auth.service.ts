
import { ILoginInAppRequest } from "@/interfaces/auth/loginInAppRequest.interface";
import { ILoginResponse } from "@/interfaces/auth/loginResponse.interface";
import { ILoginSnsRequest } from "@/interfaces/auth/loginSnsRequest.interface";
import { IRegisterUserInAppRequest } from "@/interfaces/auth/registerUserInAppRequest.interface";
import { IRevokeTokenRequest } from "@/interfaces/auth/renewTokenRequest.interface";
import { loginService } from "@/services";


export class AuthService {
    async userLoginInApp(reqLogin: ILoginInAppRequest): Promise<ILoginResponse> {
        return await loginService.userLoginInApp(reqLogin)
    }

    async userRegisterInApp(reqRegister: IRegisterUserInAppRequest): Promise<ILoginResponse> {
        return await loginService.userRegisterInApp(reqRegister)
    }

    async revokeTokenInApp(revokeToken: IRevokeTokenRequest): Promise<ILoginResponse> {
        return await loginService.userRevokeTokenInApp(revokeToken)
    }

    async userLoginSns(reqLogin: ILoginSnsRequest): Promise<ILoginResponse> {
        return await loginService.userloginSNS(reqLogin)
    }


}
