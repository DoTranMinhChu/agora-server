import { IHLErrorResponse } from "../../interfaces"


export interface IBaseErrorOption {
    code: number
    type: string
    message: string | IHLErrorResponse
    data?: any
}
export class BaseError extends Error {

    constructor(options: IBaseErrorOption) {
        super()
        this.options = options
    }

    options: IBaseErrorOption

    toJSON() {
        return this.options
    }
}
