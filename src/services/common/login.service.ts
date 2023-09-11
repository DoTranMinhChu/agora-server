import { ELoginType } from "@/enums/loginType.enum";
import { ERole } from "@/enums/role.enum";
import { IAccessToken } from "@/interfaces/auth/accessToken.interface";
import { ILoginInAppRequest } from "@/interfaces/auth/loginInAppRequest.interface";
import { ILoginResponse } from "@/interfaces/auth/loginResponse.interface";
import { IRegisterUserInAppRequest } from "@/interfaces/auth/registerUserInAppRequest.interface";
import { IRevokeTokenRequest } from "@/interfaces/auth/renewTokenRequest.interface";
import { refreshTokenUserRepository, userRepository } from "@/repositories";
import { bcryptService, errorService, tokenService } from "..";
import { ERROR_MESSAGE } from "../errors/errorMessage";
import axios from "axios";
import { UserEntity } from "@/models/entities";
import { ILoginSnsRequest } from "@/interfaces/auth/loginSnsRequest.interface";
export class LoginService {
    constructor() { }

    async userRegisterInApp(registerRequest: IRegisterUserInAppRequest): Promise<ILoginResponse> {
        const reqLogin: ILoginInAppRequest = {
            ...registerRequest
        }
        const existedUser = await userRepository.findByUsername(registerRequest.username);

        if (existedUser) {
            throw errorService.auth.errorCustom(ERROR_MESSAGE.USERNAME_ALREADY_REGISTERED)
        }
        registerRequest.password = await bcryptService.hashData(registerRequest.password);
        await userRepository.create(registerRequest, {});


        return await this.userLoginInApp(reqLogin)
    }


    async userLoginInApp(reqLogin: ILoginInAppRequest): Promise<ILoginResponse> {
        const { username, password } = reqLogin;
        let user = await userRepository.findOne({
            where: {
                username
            },
        })
        if (!user) {
            throw errorService.auth.errorCustom(ERROR_MESSAGE.USERNAME_DOES_NOT_EXIST);
        }
        if (user.loginType != ELoginType.INAPP) {
            switch (user.loginType) {
                case ELoginType.GOOGLE: {
                    throw errorService.database.errorCustom(ERROR_MESSAGE.THIS_ACCOUNT_IS_GOOGLE)
                }
                case ELoginType.APPLE: {
                    throw errorService.database.errorCustom(ERROR_MESSAGE.THIS_ACCOUNT_IS_APPLE)
                }
                case ELoginType.KAKAO: {
                    throw errorService.database.errorCustom(ERROR_MESSAGE.THIS_ACCOUNT_IS_KAKAOTALK)
                }
            }
        }
        if (!await bcryptService.compareDataWithHash(password, user.password)) {
            throw errorService.auth.errorCustom(ERROR_MESSAGE.PASSWORD_OR_USERNAME_INCORRECT)
        }
        const accessTokenPayload: IAccessToken = {
            id: user.id,
            loginType: user.loginType,
            roles: [ERole.NORMAL],
            type: "USER"
        }

        return {
            accessToken: await this.generateAccessToken(accessTokenPayload),
            refreshToken: await this.generateRefreshTokenUser(accessTokenPayload.id)
        };
    }

    async userRevokeTokenInApp(revokeToken: IRevokeTokenRequest): Promise<ILoginResponse> {
        const refreshToken = await refreshTokenUserRepository.findOneByRefreshToken(revokeToken.refreshToken);
        if (!refreshToken) {
            throw errorService.auth.badToken()
        }
        const { userId } = refreshToken
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw errorService.auth.badToken()
        }
        const accessTokenPayload: IAccessToken = {
            id: user.id,
            loginType: user.loginType,
            roles: [ERole.NORMAL],
            type: "USER"
        }
        const accessToken = await this.generateAccessToken(accessTokenPayload);

        return { accessToken }

    }

    async generateAccessToken(accessTokenPayload: IAccessToken): Promise<string> {
        return await tokenService.generateToken(accessTokenPayload)
    }

    async generateRefreshTokenUser(userId: string): Promise<string> {
        const refreshTokenUser = await refreshTokenUserRepository.findOneByUserId(userId);
        if (refreshTokenUser) {
            try {
                tokenService.decodeToken(refreshTokenUser.refreshToken);
                return refreshTokenUser.refreshToken;
            } catch (e) {
            }
        }
        const refreshToken = await tokenService.generateToken({}, { exp: '1 years' })
        const newRefreshTokenUser = await refreshTokenUserRepository.create({
            userId,
            refreshToken
        })
        return newRefreshTokenUser.refreshToken;
    }

    async userloginSNS(loginSnsRequest: ILoginSnsRequest) {
        const { loginType, token } = loginSnsRequest
        let isNewSignup = false;
        let url: string;
        let response: any = {};
        let dataFromSocial: any = {};
        let username = null;
        let name = null;
        let avatar = null;
        let email = null;
        let dob = null;
        let phone = null;
        switch (loginType) {
            case ELoginType.GOOGLE:
                url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
                response = await axios.get(url);
                dataFromSocial = response.data
                username = dataFromSocial.email;
                email = dataFromSocial.email;
                avatar = dataFromSocial.picture;
                name = dataFromSocial.name
                break;
            case ELoginType.FACEBOOK:
                url = `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.width(300).height(300)`;
                response = await axios.get(url);
                dataFromSocial = response.data
                username = dataFromSocial.id;
                name = dataFromSocial.name;
                avatar = dataFromSocial.picture.data.url;
                break;
            case ELoginType.APPLE:
                url = "com.chu.appname";
                username = dataFromSocial.email;
                email = dataFromSocial.email;
                break;
            case ELoginType.PHONE:
                // dataFromSocial = await firebaseService.verifyIdToken(token);
                username = dataFromSocial.phone_number;
                phone = dataFromSocial.phone_number;
                break;

            default:
                throw errorService.auth.errorCustom(ERROR_MESSAGE.LOGIN_METHOD_NOT_SUPPORTED);
                break;
        }
        let user: UserEntity | null = await userRepository.findOne({
            where: {
                loginType,
                username,
            }
        })

        if (!user) {
            const body: any = {
                name,
                username,
                email,
                avatar,
                loginType,
                dob,
                phone
            };
            user = await userRepository.create(body);
            isNewSignup = true;
        }

        const accessTokenPayload: IAccessToken = {
            id: user.id,
            loginType: user.loginType,
            roles: [ERole.NORMAL],
            type: "USER"
        }

        return {
            accessToken: await this.generateAccessToken(accessTokenPayload),
            refreshToken: await this.generateRefreshTokenUser(accessTokenPayload.id),
            isNewSignup
        };
    }
}