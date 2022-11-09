import mongodb from '@/libs/mongodb'
import { Todo } from '@/modules/todo/types/todo'

interface IReturn {
    count: number
    items: Todo.ITodo[]
}

async function find(page?: number): Promise<IReturn> {
    const todos = await mongodb.find<Todo.ITodo>({
        collection: 'todos',
        limit: 5,
        page: page || 1
    })

    return {
        count: todos.count,
        items: todos.items
    }
}

export default find
