import { NextFunction, Request, Response } from 'express'

import TodoService from '@/modules/todo/services/TodoService'

interface IResponseBody {
    ok: boolean
}

interface IRequestParams {
    id: string
}

async function remove(req: Request<IRequestParams>, res: Response<IResponseBody>, next: NextFunction): Promise<Response<IResponseBody>> {
    const { id } = req.params
    await TodoService.remove({ _id: id })

    return res.status(200).send({ ok: true })
}

export default remove
