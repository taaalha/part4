const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')

mongoose.connect(config.mongoUrl)
logger.info('Connecting to',config.mongoUrl)

app.use(cors())
app.use(express.json())

const blogsRouter = require('./controllers/blogs')
app.use('/api/blogs',blogsRouter)


module.exports = app