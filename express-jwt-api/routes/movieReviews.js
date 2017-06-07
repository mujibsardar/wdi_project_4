const
  express = require('express'),
  reviewsRouter = new express.Router(),
  Review = require('../models/MovieReview.js')

reviewsRouter.route('/')
  .get((req, res) => {
    Review.find({}, (err, reviews) => {
      if(err) console.log(err);
      res.json(reviews)
    })
  })
  .post((req, res) => {
    Review.create(req.body, (err, review) => {
      if(err) console.log(err);
      res.json({success: true, message: "Left review.", review})
    })
  }).delete((req, res) => {
    Review.remove({}, (err, reviews) => {
      res.json({success: true, message: "All reviews deleted.", reviews})
    })
  })

  reviewsRouter.route('/:movieID')
      .get((req, res) => {
        Review.find({movieID: req.params.movieID}, (err, reviews) => {
          if(err) console.log(err);
          res.json(reviews)
        })
      })

  module.exports = reviewsRouter
