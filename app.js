const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middelware')

mongoose.connect(config.mongoUrl)
logger.info('Connecting to',config.mongoUrl)

app.use(cors())
app.use(express.json())

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use('/api/blogs',blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)
app.use('/api/login', loginRouter)

module.exports = app