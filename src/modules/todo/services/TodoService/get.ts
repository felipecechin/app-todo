import { Todo } from '@/modules/todo/types/todo'
import TodoRepository from '@/modules/todo/repositories/TodoRepository'

interface IParams {
    page: number
}

interface IReturn {
    count: number
    items: Todo.ITodo[]
}

async function get({ page }: IParams): Promise<IReturn> {
    const { count, items } = await TodoRepository.find(page)

    return {
        count,
        items
    }
}

export default get
