const
  express = require('express'),
  authorize = require('../config/serverAuth.js').authorize,
  tvsRouter = new express.Router(),
  moviedbKey = process.env.MOVIEDB_KEY,
  movieDB = require('moviedb')(moviedbKey)


// moviesRouter.use(authorize)

tvsRouter.route('/')
  .get((req, response) => {
    movieDB.discoverTv({}, (err, res) => {
      response.json(res)
    })
  })

  tvsRouter.route('/:id')
    .get((req, response) => {
      movieDB.tvInfo({id: req.params.id}, (err, res) => {
        response.json(res)
      })
  })

  module.exports = tvsRouter
