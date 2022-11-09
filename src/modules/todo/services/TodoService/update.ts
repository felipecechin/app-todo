import { Document, UpdateFilter } from 'mongodb'
import _ from 'lodash'

import { Todo } from '@/modules/todo/types/todo'
import TodoRepository from '@/modules/todo/repositories/TodoRepository/index'
import TodoSchemas from '@/modules/todo/schemas/TodoSchemas/index'
import validateSchema from '@/shared/utils/validateSchema'

interface IParams {
    description: string
    done: boolean
    _id: string
}

async function update(data: IParams): Promise<Todo.ITodo> {
    const newData = await validateSchema(TodoSchemas.update, data, false, true)

    const todoToUpdate = await TodoRepository.findById(data._id)

    let newTodo = { ...todoToUpdate }
    let updateFilter: UpdateFilter<Document> = {}

    if (newTodo.startedAt !== undefined && newData.done) {
        const timeDifference = Math.abs(newTodo.startedAt.getTime() - new Date().getTime())
        const timeInSeconds = timeDifference / 1000
        if (newTodo.workTime) {
            newTodo.workTime = newTodo.workTime + timeInSeconds
        } else {
            newTodo.workTime = timeInSeconds
        }
        newTodo = _.omit(newTodo, 'startedAt')
        updateFilter = {
            $unset: {
                startedAt: 1
            }
        }
    } else {
        newTodo = {
            ...newTodo,
            ...newData
        }
    }

    updateFilter.$set = newTodo

    newTodo = await TodoRepository.update(todoToUpdate._id as string, updateFilter)

    return newTodo
}

export default update
