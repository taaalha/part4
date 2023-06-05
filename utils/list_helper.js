const logger = require('./logger')
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}
  

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(individual => { 
    logger.info("individual.likes is",individual.likes)
    total = individual.likes + total
    logger.info("total now is", total)
  })
  return total
}

const favortieBlog = (blogs) => {
  let mostLikedBlog = blogs[0]; 

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > mostLikedBlog.likes) {
      mostLikedBlog = blogs[i]; 
    }
  }
  const { title, author, likes } = mostLikedBlog
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author'); 
  logger.info("authorCounts is", authorCounts)

  const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]); 

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor]
  }
}

const mostLikes = (blogs) => {
  const authorLikes = _.groupBy(blogs, 'author') 
  logger.info("authorLikes are",authorLikes)

  const authorTotalLikes = _.mapValues(authorLikes, (posts) => _.sumBy(posts, 'likes'))
  logger.info("authorTotalLikes are",authorTotalLikes)

  const topAuthor = _.maxBy(_.keys(authorTotalLikes), (author) => authorTotalLikes[author])
  logger.info("topAuthor is", topAuthor)

  return {
    author: topAuthor,
    likes: authorTotalLikes[topAuthor]
  }
}

module.exports = {
    dummy, totalLikes, favortieBlog, mostBlogs, mostLikes
}