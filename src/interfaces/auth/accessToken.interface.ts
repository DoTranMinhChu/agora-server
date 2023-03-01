import { ELoginType } from "@/enums/loginType.enum"
import { ERole } from "@/enums/role.enum"

export interface IAccessToken {
    id: string
    roles: Array<ERole>,
    loginType: ELoginType
    type: "USER" | "ADMIN",
    [key: string]: any
}