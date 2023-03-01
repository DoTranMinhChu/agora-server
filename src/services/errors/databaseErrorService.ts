
import { IErrorResponse, IHLErrorResponse } from "../../interfaces";
import { BaseError } from "./base";
import { ERROR_MESSAGE } from "./errorMessage";
export class DatabaseException extends BaseError {
    constructor(key: string, message: string | IHLErrorResponse, code?: number) {
        super({
            code: code || 500,
            type: `database_exception_${key}`,
            message,
        });
    }
}
export class DatabaseErrorService {
    recordNotFound() {
        return new DatabaseException("record_not_found", ERROR_MESSAGE.RECORD_NOT_FOUND.message);
    }
    queryFail(message: IErrorResponse | string = "Query Fail") {
        const key = "query_fail"
        if (typeof message == 'string') return new DatabaseException(key, message);
        return this.resErrWithCode(key, message)
    }
    errorCustom(message: IErrorResponse | string = "Error custom.", errCode?: number) {
        const key = "error_custom"
        if (typeof message == 'string') return new DatabaseException(key, message, errCode);
        return this.resErrWithCode(key, message)
    }
    invalidScope(message: IErrorResponse | string = "Invalid scope") {
        const key = "invalid_scope"
        if (typeof message == 'string') return new DatabaseException(key, message);
        return this.resErrWithCode(key, message)
    }

    private resErrWithCode(key: string, errorResonse: IErrorResponse) {
        return new DatabaseException(key, errorResonse.message, errorResonse.code);
    }
}
