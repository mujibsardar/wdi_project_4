const
express = require('express'),
// authorize = require('../config/serverAuth.js').authorize,
reviewsRouter = new express.Router()

reviewsRouter.route('/')
  .get((req, response) => {

  })
  .post((req, res) => {
    console.log("Movie reviews router hit");
    res.json("Success")
  })
