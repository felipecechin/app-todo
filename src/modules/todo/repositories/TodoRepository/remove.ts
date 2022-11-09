import { ObjectId } from 'mongodb'

import mongodb from '@/libs/mongodb'
import { Todo } from '@/modules/todo/types/todo'

async function remove(_id: string): Promise<Todo.ITodo> {
    const newTodo = await mongodb.deleteOne<Todo.ITodo>({
        collection: 'todos',
        filter: {
            _id: new ObjectId(_id)
        }
    })

    return newTodo as Todo.ITodo
}

export default remove
