export interface ErrorResponseDto {
  timestamp?: any;
  path?: any,
  status?: number,
  error?: string,
  message?: string,
  requestId?: string,
  errors: ErrorItemDto[]
}

export interface ErrorItemDto {
  codes?: string[],
  arguments?: [
    {
      codes?: string[],
      arguments?: any,
      defaultMessage: string,
      code?: string
    }
  ],
  defaultMessage: String,
  objectName: string,
  field: string,
  rejectedValue: any,
  bindingFailure: false,
  code: string
}
