const blogsRouter = require('express').Router()
const Blog = require('./../models/blogs')

//Route 1
blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})
 
//Route 2
blogsRouter.post('/', (request, response) => {
const blog = new Blog(request.body)
logger.info("blog content is",blog)

blog
    .save()
    .then(result => {
    response.status(201).json(result)
    
    })
})


//export module
module.exports = blogsRouter