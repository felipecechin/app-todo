import TodoRepository from '@/modules/todo/repositories/TodoRepository/index'
import TodoSchemas from '@/modules/todo/schemas/TodoSchemas'
import validateSchema from '@/shared/utils/validateSchema'

interface IParams {
    _id: string
}

async function remove(data: IParams): Promise<void> {
    const { _id } = await validateSchema(TodoSchemas.update, data)

    await TodoRepository.remove(_id)
}

export default remove
