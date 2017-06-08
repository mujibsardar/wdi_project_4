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

// get all reviews related to a movie using movieID
  reviewsRouter.route('/:movieID')
      .get((req, res) => {
          Review.find({movieID: req.params.movieID}, (err, reviews) => {
            if(err) console.log(err);
            res.json(reviews)
          })
        })

// get all reviews related to a user using userID
  reviewsRouter.route('/user/:userID')
      .get((req, res) => {
        Review.find({userID: req.params.userID}, (err, reviews) => {
          if(err) console.log(err);
          res.json(reviews)
        })
      })

// get all reviews based on movieID and userID
  reviewsRouter.route('/movieAndUser/:movieID/:userID')
      .get((req, res) => {
        Review.findOne({movieID: req.params.movieID, userID: req.params.userID}, (err, review) => {
          if(err) console.log(err);
          res.json(review)
        })
      })

  module.exports = reviewsRouter
