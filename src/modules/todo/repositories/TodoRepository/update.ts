import { Document, ObjectId, UpdateFilter } from 'mongodb'
import _ from 'lodash'

import mongodb from '@/libs/mongodb'
import { Todo } from '@/modules/todo/types/todo'

async function update(_id: string, data: UpdateFilter<Document>): Promise<Todo.ITodo> {
    if (data.$set) {
        data.$set = _.omit(data.$set, '_id')
    } else {
        data = _.omit(data, '_id')
    }
    const newTodo = await mongodb.updateOne<Todo.ITodo>({
        collection: 'todos',
        filter: {
            _id: new ObjectId(_id)
        },
        data
    })

    return newTodo
}

export default update
