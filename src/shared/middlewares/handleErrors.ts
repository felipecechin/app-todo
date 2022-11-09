import { NextFunction, Request, Response } from 'express'

import HttpError from '@/shared/utils/HttpError'

export default (err: Error, request: Request, response: Response, next: NextFunction): Response => {
    if (err instanceof HttpError) {
        return response.status(err.status).json(err.toJson())
    }

    return response.status(500).json({
        status: 500,
        message: `Internal Server Error - ${err.message}`
    })
}
