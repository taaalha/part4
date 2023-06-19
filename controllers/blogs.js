const blogsRouter = require('express').Router()
const Blog = require('./../models/blogs')
const logger = require('../utils/logger')
const User = require('../models/user')

//Route 1
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({})
  .populate('user',{username: 1, name: 1, id: 1})
  response.json(blogs)
})
 
//Route 2
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  //const user = await User.findById(body.userId)
  const user = await User
  .find({})
  user_id = user[0].id

  const fullUser = await User.findById(user_id)

  console.log("user_id is" , user_id)

  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user_id
    }
  )
  try {
    const savedBlog = await blog.save()
    fullUser.blogs = fullUser.blogs.concat(savedBlog)  
    await fullUser.save()
    response.status(201).json(savedBlog)
  }
  catch {
    return response.status(400).json({ error: 'Title or URL is missing' });
    logger.error(savedBlog)
  }

})

//Route 3
blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndRemove(request.params.id)
  if (blog) {
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