import { NextFunction, Request, Response } from 'express'

import TodoService from '@/modules/todo/services/TodoService'

interface IRequestParams {
    id: string
}

interface IResponseBody {
    ok: boolean
}

async function finishDoing(req: Request<IRequestParams>, res: Response<IResponseBody>, next: NextFunction): Promise<Response<IResponseBody>> {
    const { id } = req.params
    await TodoService.finishDoing({ _id: id })

    return res.status(200).send({ ok: true })
}

export default finishDoing
