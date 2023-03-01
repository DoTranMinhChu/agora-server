import { EGender } from "@/enums/gender.enum"
import { ELoginType } from "@/enums/loginType.enum"

export interface IRegisterUserInAppRequest {
    name: string
    username: string,
    password: string,
    gender: EGender,
    dob: number,
    phone?: string,
    email?: string,
    loginType?: ELoginType
}