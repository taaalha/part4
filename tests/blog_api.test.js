const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const sampleBlogs = require('../utils/sample_blogs')
const Blog = require('../models/blogs')
const helper = require('./test_helper')



const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(sampleBlogs)

})

test('get correct amount of blogs in /api/blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = response.body
    expect(blogs).toHaveLength(sampleBlogs.length)
})

test('unique identifier is named id', async () => {
    const response = await api
        .get('/api/blogs')
    const blogs = response.body
    console.log(blogs)

    for (const blog of blogs) {
        expect(blog.id).toBeDefined()
    }
})

test('HTTP Post successfully creates a new blog post',async () => {
    const newBlog = {
        title: "Test blog",
        author: "Talha K",
        url: "https://IamAwesome.com/",
        likes: 100
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsinDB()
    expect(blogs).toHaveLength(sampleBlogs.length+1)

    const contents = blogs.map(b => b.title)
    expect(contents).toContain(
      'Test blog'
    )
})

test('likes property missing, then default to 0 likes', async () => {
    const newBlog = {
        title: "Test blog",
        author: "Talha K",
        url: "https://IamAwesome.com/"
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsinDB()
    const blog = blogs.find(b => b.title === newBlog.title && b.author === newBlog.author);
    expect(blog.likes).toEqual(0)

})


test('Bad request if title or url is missing', async() => {
    const newBlog = {
        title: "Test blog",
        author: "Talha K"
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const blogs = await helper.blogsinDB()
    expect(blogs).toHaveLength(sampleBlogs.length)
})


afterAll(async () => {
    await mongoose.connection.close()
})