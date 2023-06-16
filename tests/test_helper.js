const Blog  = require('../models/blogs')
const User = require('../models/user')

const blogsinDB =  async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())   
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}



module.exports = {
    blogsinDB,
    usersInDb
}