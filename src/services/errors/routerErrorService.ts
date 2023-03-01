

import { IErrorResponse, IHLErrorResponse } from '@/interfaces'
import { BaseError } from './base'
import { ERROR_MESSAGE } from './errorMessage'
class RouterException extends BaseError {
    constructor(key: string, message: string | IHLErrorResponse, code?: number) {
        super({
            code: code || 500,
            type: `router_exception_${key}`,
            message
        })
    }
}

export class RouterErrorService {
    somethingWentWrong() {
        return new RouterException('something_went_wrong', ERROR_MESSAGE.SORRY_SOMETHING_WENT_WRONG.message)
    }
    theAPINotSupported() {
        return new RouterException('api_not_supported', ERROR_MESSAGE.THE_API_NOT_SUPPORTED.message)
    }
    badRequest() {
        return new RouterException('bad_request', ERROR_MESSAGE.BAD_REQUEST.message, ERROR_MESSAGE.BAD_REQUEST.code)
    }
    errorCustom(message: IErrorResponse | string = "Error custom.", errCode?: number, key?: string) {
        if (!key) key = "error_custom"
        if (typeof message == 'string') return new RouterException(key, message, errCode);
        return this.resErrWithCode(key, message)
    }
    requestDataInvalid(message: IErrorResponse | string = "Data invalid.") {
        const key = "data_invalid"
        if (typeof message == 'string') return new RouterException(key, message);
        return this.resErrWithCode(key, message)
    }

    private resErrWithCode(key: string, errorResonse: IErrorResponse) {
        return new RouterException(key, errorResonse.message, errorResonse.code);
    }
}
