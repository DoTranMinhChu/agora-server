


import { IErrorResponse, IHLErrorResponse } from '@/interfaces'
import { BaseError } from './base'
import { ERROR_MESSAGE } from './errorMessage'
class AuthException extends BaseError {
  constructor(key: string, message: string | IHLErrorResponse, code?: number) {
    super({
      code: code || 401,
      type: `auth_exception_${key}`,
      message
    })
  }
}
export class AuthErrorService {
  unauthorized() {
    return new AuthException('unauthorized', ERROR_MESSAGE.UNAUTHORIZED.message)
  }
  permissionDeny() {
    return new AuthException('permission_deny', ERROR_MESSAGE.YOU_NOT_PERMISSIONS.message)
  }
  badToken() {
    return new AuthException('bad_token', ERROR_MESSAGE.BAD_TOKEN.message)
  }
  tokenExpired() {
    return new AuthException('token_expired', ERROR_MESSAGE.TOKEN_EXPIRED.message, ERROR_MESSAGE.TOKEN_EXPIRED.code)
  }

  errorCustom(message: IErrorResponse | string = "Error custom", errCode?: number) {
    const key = "error_custom"
    if (typeof message == 'string') return new AuthException(key, message, errCode);
    return this.resErrWithCode(key, message)


  }
  private resErrWithCode(key: string, errorResonse: IErrorResponse) {
    return new AuthException(key, errorResonse.message, errorResonse.code);
  }

}
