/* eslint-disable @typescript-eslint/no-explicit-any */
const errors: { [key: string]: string } = {
    400: 'BadRequest',
    401: 'Unauthorized',
    402: 'PaymentRequired',
    403: 'Forbidden',
    404: 'NotFound',
    405: 'MethodNotAllowed',
    406: 'NotAcceptable',
    407: 'ProxyAuthenticationRequired',
    408: 'RequestTimeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'LengthRequired',
    412: 'PreconditionFailed',
    413: 'PayloadTooLarge',
    414: 'URITooLong',
    415: 'UnsupportedMediaType',
    416: 'RangeNotSatisfiable',
    417: 'ExpectationFailed',
    418: 'ImATeapot',
    421: 'MisdirectedRequest',
    422: 'UnprocessableEntity',
    423: 'Locked',
    424: 'FailedDependency',
    425: 'TooEarly',
    426: 'UpgradeRequired',
    428: 'PreconditionRequired',
    429: 'TooManyRequests',
    431: 'RequestHeaderFieldsTooLarge',
    451: 'UnavailableForLegalReasons',
    500: 'InternalServerError',
    501: 'NotImplemented',
    502: 'BadGateway',
    503: 'ServiceUnavailable',
    504: 'GatewayTimeout',
    505: 'HTTPVersionNotSupported',
    506: 'VariantAlsoNegotiates',
    507: 'InsufficientStorage',
    508: 'LoopDetected',
    509: 'BandwidthLimitExceeded',
    510: 'NotExtended',
    511: 'NetworkAuthenticationRequired'
}

interface IToJsonReturn {
    context?: any
    message: string
    status: number
}

export default class HttpError extends Error {
    context: any
    messageLength: number
    status: number

    constructor(status = 500, message = '', context: any = null) {
        if (!message) {
            message = errors[`${status}`] || errors['500']
        }

        if (context) {
            super(`${message}: ${JSON.stringify(context, null, 2)}`)
        } else {
            super(message)
        }

        this.context = context
        this.messageLength = message.length
        this.status = status
    }

    toJson(): IToJsonReturn {
        return this.context
            ? {
                context: this.context,
                message: this.message.slice(0, this.messageLength),
                status: this.status
            }
            : {
                message: this.message.slice(0, this.messageLength),
                status: this.status
            }
    }

    toString(): string {
        return JSON.stringify(this.toJson())
    }
}
