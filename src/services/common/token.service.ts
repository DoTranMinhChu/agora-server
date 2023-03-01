import { config } from "@/configs";
import { IAccessToken } from "@/interfaces/auth/accessToken.interface";
import jsonwebtoken from "jsonwebtoken"
import { errorService } from "..";


export interface IGenerateTokenOption {
    exp?: string;
    secret?: string;
}
export interface IDecodeTokenOption {
    secret?: string;
}


export interface IToken {
    payload: any
    exp: Date
    option?: IGenerateTokenOption | unknown | undefined
}

export class TokenService {
    constructor() { }
    async generateToken(
        payload: any,
        option: IGenerateTokenOption = {
            exp: "60 days",
            secret: config.server.secret
        }
    ) {
        const secret: string = option.secret || config.server.secret;

        return jsonwebtoken.sign(payload, secret, { expiresIn: option.exp })
    }
    decodeToken(token: string, option?: IDecodeTokenOption): IAccessToken {

        try {
            const secret = (option && option.secret) || config.server.secret;
            return jsonwebtoken.verify(token, secret).valueOf() as IAccessToken;
        } catch (err) {
            throw errorService.auth.badToken();
        }

    }

}
