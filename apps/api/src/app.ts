import express from 'express'
import routes from './routes/index.js'
import ErrorHandler from './middleware/ErrorHanlder.js'

const app = express()
app.use(routes)
app.use(ErrorHandler)

export default app

