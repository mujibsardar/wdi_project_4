const
  mongoose = require('mongoose'),

  movieReviewSchema = new mongoose.Schema({
    movieID: Number,
    plot: Number,
    originality: Number,
    acting: Number,
    message: Number,
    realism: Number,
    music: Number,
    specialEffects: Number,
    directing: Number,
    humor: Number,
    kidsFriendly: Number,
    comment: String
  })

  module.exports = mongoose.model('MovieReview', movieReviewSchema)
