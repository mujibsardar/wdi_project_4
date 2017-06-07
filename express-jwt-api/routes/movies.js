const
  express = require('express'),
  moviesRouter = new express.Router(),
  moviedbKey = process.env.MOVIEDB_KEY,
  movieDB = require('moviedb')(moviedbKey)


// moviesRouter.use(authorize)

moviesRouter.route('/')
  .get((req, response) => {
    movieDB.discoverMovie({}, (err, res) => {
      response.json(res)
    })
  })
  .post((req, res) => {
  })

// Specific movie
moviesRouter.route('/:id')
  .get((req, response) => {
    movieDB.movieInfo({id: req.params.id}, (err, res) => {
      response.json(res)
    })
})
  .patch((req, res) => {

  })
  .delete((req, res) => {

  })

module.exports = moviesRouter
