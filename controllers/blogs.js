const blogsRouter = require('express').Router()
const Blog = require('./../models/blogs')
const logger = require('../utils/logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middelware')

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.startsWith('Bearer ')) {    
    return authorization.replace('Bearer ', '')  
  }  
  return null
}

//Route 1
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({})
  .populate('user',{username: 1, name: 1, id: 1})
  response.json(blogs)
})
 
//Route 2
blogsRouter.post('/',userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    }
  )
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)  
    await user.save()
    response.status(201).json(savedBlog)
  }
  catch {
    return response.status(400).json({ error: 'Title or URL is missing' });
    logger.error(savedBlog)
  }

})

//Route 3
blogsRouter.delete('/:id', userExtractor ,async (request, response) => {
  const blogID = request.params.id

  const blog = await Blog.findById(blogID)
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }
  console.log("blog is ", blog )

  const UserId = request.user.id
  console.log("userID is", UserId)

  if (blog.user.toString() !== UserId.toString()) {
    return response.status(403).json({ error: 'Unauthorized access' });
  }
  else {
    await Blog.findByIdAndRemove(blogID)
    response.status(204).end()
  }
 
})



//Route 4
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title   :  body.title,
    author  :  body.author,
    url     :  body.url,
    likes   :  body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (updatedBlog) {
    response.status(204).end()
  }

})
//export module
module.exports = blogsRouter