import { Router } from 'express'

import todoRoutes from '@/modules/todo'

const routes = Router()

routes.use('/todo', todoRoutes)

export default routes
