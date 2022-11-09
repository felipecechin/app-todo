import { ObjectId } from 'mongodb'

import mongodb from '@/libs/mongodb'
import { Todo } from '@/modules/todo/types/todo'

async function findById(_id: string): Promise<Todo.ITodo> {
    const todo = await mongodb.findOne<Todo.ITodo>({
        collection: 'todos',
        filter: {
            _id: new ObjectId(_id)
        }
    })

    return todo as Todo.ITodo
}

export default findById
