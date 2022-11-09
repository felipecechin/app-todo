import { Todo } from '@/modules/todo/types/todo'
import TodoRepository from '@/modules/todo/repositories/TodoRepository/index'
import TodoSchemas from '@/modules/todo/schemas/TodoSchemas/index'
import validateSchema from '@/shared/utils/validateSchema'

interface IParams {
    description: string
}

async function store(data: IParams): Promise<Todo.ITodo> {
    const validatedData = await validateSchema(TodoSchemas.store, data)

    const newTodo = {
        ...validatedData,
        createdAt: new Date(),
        done: false
    }

    const createdTodo = await TodoRepository.create(newTodo)

    return createdTodo
}

export default store
