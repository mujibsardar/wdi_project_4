const
  express = require('express'),
  reviewsRouter = new express.Router(),
  Review = require('../models/MovieReview.js')


/////////////////////////////////////////
// Get all reviews
reviewsRouter.route('/')
  .get((req, res) => {
    Review.find({}, (err, reviews) => {
      if(err) console.log(err);
      res.json(reviews)
    })
  })
// Post a review
  .post((req, res) => {
    Review.create(req.body, (err, review) => {
      if(err) console.log(err);
      res.json({success: true, message: "Left review.", review})
    })
// Delete ALL reviews
  }).delete((req, res) => {
    Review.remove({}, (err, reviews) => {
      res.json({success: true, message: "All reviews deleted.", reviews})
    })
  })
/////////////////////////////////////////


/////////////////////////////////////////
// Update a review
reviewsRouter.route('/:id')
    .patch((req, res) => {
      Review.findById(req.params.id, (err, review) => {
        if(err) console.log(err);
        Object.assign(review, req.body)
        review.save((err, r) => {
          res.json({success: true, message: "Review updated.", r})
        })
      })
    })
/////////////////////////////////////////


/////////////////////////////////////////
// Get all reviews related to a movie using movieID
  reviewsRouter.route('/:movieID')
      .get((req, res) => {
          Review.find({movieID: req.params.movieID}, (err, reviews) => {
            if(err) console.log(err);
            res.json(reviews)
          })
        })

// Get all reviews related to a user using userID
  reviewsRouter.route('/user/:userID')
      .get((req, res) => {
        Review.find({userID: req.params.userID}, (err, reviews) => {
          if(err) console.log(err);
          res.json(reviews)
        })
      })

// Get all reviews based on movieID and userID
  reviewsRouter.route('/movieAndUser/:movieID/:userID')
      .get((req, res) => {
        Review.findOne({movieID: req.params.movieID, userID: req.params.userID}, (err, review) => {
          if(err) console.log(err);
          res.json(review)
        })
      })
/////////////////////////////////////////

  module.exports = reviewsRouter
