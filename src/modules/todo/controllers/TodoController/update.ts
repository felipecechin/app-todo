import { NextFunction, Request, Response } from 'express'

import { Todo } from '@/modules/todo/types/todo'
import TodoService from '@/modules/todo/services/TodoService'

interface IResponseBody {
    todo: Todo.ITodo
}

interface IRequestBody {
    description: string
    done: boolean
}

interface IRequestParams {
    id: string
}

async function update(req: Request<IRequestParams, any, IRequestBody>, res: Response<IResponseBody>, next: NextFunction): Promise<Response<IResponseBody>> {
    const { id } = req.params
    const { description, done } = req.body
    const updatedTodo = await TodoService.update({ _id: id, description, done })

    return res.status(200).send({ todo: updatedTodo })
}

export default update
