const
  express = require('express'),
  authorize = require('../config/serverAuth.js').authorize,
  moviesRouter = new express.Router(),
  moviedbKey = process.env.MOVIEDB_KEY,
  movieDB = require('moviedb')(moviedbKey)


// moviesRouter.use(authorize)

moviesRouter.route('/')
  .get((req, response) => {
    console.log("movieKey", moviedbKey);
    movieDB.discoverMovie({}, (err, res) => {
      response.json(res)
    })
  })
  .post((req, res) => {

  })

// Specific movie
moviesRouter.route('/:id')
  .get((req, response) => {

})
  .patch((req, res) => {

  })
  .delete((req, res) => {

  })

module.exports = moviesRouter
