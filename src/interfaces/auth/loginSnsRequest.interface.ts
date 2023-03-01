import { ELoginType } from "@/enums/loginType.enum"

export interface ILoginSnsRequest {
    token: string,
    loginType: ELoginType
}