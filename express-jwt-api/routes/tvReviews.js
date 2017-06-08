const
  express = require('express'),
  reviewsRouter = new express.Router(),
  Review = require('../models/TVReview.js')

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

// get all reviews related to a tv using tvID
  reviewsRouter.route('/:tvID')
      .get((req, res) => {
          Review.find({tvID: req.params.tvID}, (err, reviews) => {
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

// get all reviews based on tvID and userID
  reviewsRouter.route('/tvAndUser/:tvID/:userID')
      .get((req, res) => {
        Review.findOne({tvID: req.params.tvID, userID: req.params.userID}, (err, review) => {
          if(err) console.log(err);
          res.json(review)
        })
      })

  module.exports = reviewsRouter
