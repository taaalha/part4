const listHelper = require('../utils/list_helper')
const blogs = require('../utils/sample_blogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe ('totalLikes', () => {

    test('total likes should be a positive number', () => {
        const total = listHelper.totalLikes(blogs)
        expect(total).toBeGreaterThan(0)
    })
})

test('most liked blog', () => {
    mostLikedBlog = listHelper.favortieBlog(blogs)
    expect(mostLikedBlog).toEqual(
        {title : "Canonical string reduction",
         author: "Edsger W. Dijkstra",
         likes: 12
        }
    )
})

test('top Author is Robert C Martin', () => {
    topAuthor = listHelper.mostBlogs(blogs)
    expect(topAuthor).toEqual(
        {
            author: "Robert C. Martin",
            blogs: 3
        }
    )
})

test('Author with most likes is Edsger W. Dijkstra', () => {
    topAuthor = listHelper.mostLikes(blogs)
    expect(topAuthor).toEqual(
        {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
    )
})