import { NextFunction, Request, Response } from 'express'

import { Todo } from '@/modules/todo/types/todo'
import TodoService from '@/modules/todo/services/TodoService'

interface IResponseBody {
    todo: Todo.ITodo
}

interface IRequestBody {
    description: string
}

async function store(req: Request<any, any, IRequestBody>, res: Response<IResponseBody>, next: NextFunction): Promise<Response<IResponseBody>> {
    const { description } = req.body
    const newTodo = await TodoService.store({ description })

    return res.status(200).send({ todo: newTodo })
}

export default store
