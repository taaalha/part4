const Blog  = require('../models/blogs')

const blogsinDB =  async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())   
}

module.exports = {blogsinDB}