import { Router } from 'express'

import TodoController from '@/modules/todo/controllers/TodoController'

const todoRoutes = Router()

todoRoutes.get('/', TodoController.get)
todoRoutes.post('/', TodoController.store)
todoRoutes.put('/:id', TodoController.update)
todoRoutes.patch('/:id/start-doing', TodoController.startDoing)
todoRoutes.patch('/:id/finish-doing', TodoController.finishDoing)
todoRoutes.delete('/:id', TodoController.remove)

export default todoRoutes
