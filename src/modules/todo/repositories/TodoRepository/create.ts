import mongodb from '@/libs/mongodb'
import { Todo } from '@/modules/todo/types/todo'

async function create(todo: Todo.ITodo): Promise<Todo.ITodo> {
    const createdTodo = await mongodb.insertOne<Todo.ITodo>({
        collection: 'todos',
        data: todo
    })

    return createdTodo
}

export default create
