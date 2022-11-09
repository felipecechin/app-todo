import joi from '@/libs/joi'
import { Todo } from '@/modules/todo/types/todo'

const general = joi.object<Todo.ITodo>({
    _id: joi.string().required(),
    description: joi.string().required(),
    done: joi.boolean().required(),
    createdAt: joi.date().required(),
    startedAt: joi.date().required(),
    workTime: joi.number().required()
})

export default general
