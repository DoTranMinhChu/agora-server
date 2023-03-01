

// Error Interface
export interface IHLErrorResponse {
  ko: string,
  en: string,
  vi: string
  [x: string]: any
}

export interface IErrorResponse {
  message: string | IHLErrorResponse
  code: number,
  [x: string]: any
}


