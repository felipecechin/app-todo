import create from './create'
import find from './find'
import findById from './findById'
import remove from './remove'
import update from './update'

const TodoRepository = {
    find,
    create,
    update,
    findById,
    remove
}

export default TodoRepository
