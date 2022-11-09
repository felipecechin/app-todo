import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'

import HttpError from '@/shared/utils/HttpError'
import { Todo } from '@/modules/todo/types/todo'
import TodoService from '@/modules/todo/services/TodoService'

interface IResponse {
    todos: {
        count: number
        items: Todo.ITodo[]
    }
}

async function get(req: Request, res: Response<IResponse>, next: NextFunction): Promise<Response<IResponse>> {
    const { page } = req.query
    if (page !== undefined && _.isNaN(Number(page))) {
        throw new HttpError(400, 'Invalid page')
    }
    const todos = await TodoService.get({ page: Number(page) })

    return res.status(200).send({ todos })
}

export default get
