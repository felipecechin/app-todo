import HttpError from '@/shared/utils/HttpError'
import { Todo } from '@/modules/todo/types/todo'
import TodoRepository from '@/modules/todo/repositories/TodoRepository/index'
import TodoSchemas from '@/modules/todo/schemas/TodoSchemas'
import validateSchema from '@/shared/utils/validateSchema'

interface IParams {
    _id: string
}

async function startDoing(data: IParams): Promise<Todo.ITodo> {
    await validateSchema(TodoSchemas.update, data)

    const todoToUpdate = await TodoRepository.findById(data._id)

    if (todoToUpdate.done) {
        throw new HttpError(500, 'Todo already done')
    }

    if (todoToUpdate.startedAt !== undefined) {
        throw new HttpError(500, 'Todo already started')
    }

    if (!todoToUpdate.startedAt) {
        todoToUpdate.startedAt = new Date()
    }

    await TodoRepository.update(todoToUpdate._id as string, todoToUpdate)

    return todoToUpdate
}

export default startDoing
