const
  mongoose = require('mongoose'),

  tvReviewSchema = new mongoose.Schema({
    userID: String,
    tvID: Number,
    plot: Number,
    originality: Number,
    acting: Number,
    inspiration: Number,
    realism: Number,
    music: Number,
    specialEffects: Number,
    directing: Number,
    humor: Number,
    kidsFriendly: Number,
    comment: String
  })

  module.exports = mongoose.model('TVReview', tvReviewSchema)
