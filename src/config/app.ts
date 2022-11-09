import 'express-async-errors'
import 'dotenv/config'
import express from 'express'

import handleErrors from '@/shared/middlewares/handleErrors'
import routes from '@/config/routes'

const app = express()

app.use(express.json())
app.use(routes)
app.use(handleErrors)

export { app }
