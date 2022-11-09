import _ from 'lodash'

import HttpError from '@/shared/utils/HttpError'
import { Todo } from '@/modules/todo/types/todo'
import TodoRepository from '@/modules/todo/repositories/TodoRepository/index'
import TodoSchemas from '@/modules/todo/schemas/TodoSchemas'
import validateSchema from '@/shared/utils/validateSchema'

interface IParams {
    _id: string
}

async function finishDoing(data: IParams): Promise<Todo.ITodo> {
    await validateSchema(TodoSchemas.update, data)

    const todoToUpdate = await TodoRepository.findById(data._id)

    if (todoToUpdate.done) {
        throw new HttpError(500, 'Todo already done')
    }

    if (todoToUpdate.startedAt === undefined) {
        throw new HttpError(500, 'Todo not started')
    }

    let newTodo = { ...todoToUpdate }

    if (newTodo.startedAt !== undefined) {
        const timeDifference = Math.abs(newTodo.startedAt.getTime() - new Date().getTime())
        const timeInSeconds = timeDifference / 1000
        if (newTodo.workTime) {
            newTodo.workTime = newTodo.workTime + timeInSeconds
        } else {
            newTodo.workTime = timeInSeconds
        }
    }

    newTodo = _.omit(newTodo, 'startedAt')
    const updateFilter = {
        $set: newTodo,
        $unset: {
            startedAt: 1
        }
    }

    newTodo = await TodoRepository.update(todoToUpdate._id as string, updateFilter)

    return newTodo
}

export default finishDoing
