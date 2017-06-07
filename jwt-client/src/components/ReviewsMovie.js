import React, {Component} from 'react'
import axios from 'axios'


///////////////////////// ReviewMovie Class //////////////////////////////////
class ReviewsMovie extends Component {

  constructor(){
    super()
    this.state = {
      canLeaveReview: true
    }
  }


  ///////////// 11111111 ///////////////////////
  componentDidMount() {

  }
  ///////////// 11111111 ///////////////////////


  ///////////// 11111111 ///////////////////////
  _leaveReview(review) {
    axios ({
        url: '/api/movieReviews/',
        method: 'post',
        data: review
    }).then(response => {
      this.setState = {
        canLeaveReview: false
      }
    })
  }
  ///////////// 11111111 ///////////////////////



  ///////////// 11111111 ///////////////////////
  render() {
    var movie = this.props.movie.details
    var title = movie.title
    var overview = movie.overview
    var reviews = this.props.movie.reviews

    return (
      <div className="movieDetails">
        <h2>{title}</h2>
        <h5>{overview}</h5>

        <Reviews reviews={reviews} />

        {{
          true: <LeaveReview onLeaveReview={this._leaveReview.bind(this)} movie={movie} />,
        }[this.state.canLeaveReview]}

      </div>
    )
    }
  }
  ///////////////////////// ReviewMovie Class //////////////////////////////////




  ///////////////////////// Reviews Class //////////////////////////////////
  class Reviews extends Component{
      render(){
        var reviews = this.props.reviews
        var reviewsHTML = []

        var avgPlotScore = 0
        var avgOriginalityScore = 0
        var avgActingScore = 0
        var avgMessageScore = 0
        var avgRealismScore = 0
        var avgMusicScore = 0
        var avgSpecialEffectsScore = 0
        var avgDirectingScore = 0
        var avgHumorScore = 0
        var avgKidsFriendlyScore = 0
        var avgComments = []


        reviews.forEach((r, i) => {
          avgPlotScore += r.plot
          avgOriginalityScore += r.originality
          avgActingScore += r.acting
          avgMessageScore += r.message
          avgRealismScore += r.realism
          avgMusicScore += r.music
          avgSpecialEffectsScore += r.specialEffects
          avgDirectingScore += r.directing
          avgHumorScore += r.humor
          avgKidsFriendlyScore += r.kidsFriendly
          avgComments.push(r.comment)
        })

        avgPlotScore /= reviews.length
        avgOriginalityScore /= reviews.length
        avgActingScore /= reviews.length
        avgMessageScore /= reviews.length
        avgRealismScore /= reviews.length
        avgMusicScore /= reviews.length
        avgSpecialEffectsScore /= reviews.length
        avgDirectingScore /= reviews.length
        avgHumorScore /= reviews.length
        avgKidsFriendlyScore /= reviews.length

        reviewsHTML.push(
          <li>Average Plot Score: {avgPlotScore}</li>
        )

        return (
          <div className="reviews">
            <h2>Reviews</h2>
            <ul>
              <li> Plot Score: {avgPlotScore}%</li>
              <li> Originality Score: {avgOriginalityScore}%</li>
              <li> Acting Score: {avgActingScore}%</li>
              <li> Message Score: {avgMessageScore}%</li>
              <li> Realism Score: {avgRealismScore}%</li>
              <li> Music Score: {avgMusicScore}%</li>
              <li> Special Effects Score: {avgSpecialEffectsScore}%</li>
              <li> Directing Score: {avgDirectingScore}%</li>
              <li> Humor Score: {avgHumorScore}%</li>
              <li> Kids Friendly Score: {avgKidsFriendlyScore}%</li>
            </ul>
          </div>)
      }
  }
  ///////////////////////// Reviews Class //////////////////////////////////



  ///////////////////////// LeaveReview Class //////////////////////////////////
class LeaveReview extends Component {
  _handleLeaveReview(evt) {
    evt.preventDefault()
    const review = {
      movieID: this.props.movie.id,
      plot: this.refs.plot.value,
      originality: this.refs.originality.value,
      acting: this.refs.acting.value,
      message: this.refs.message.value,
      realism: this.refs.realism.value,
      music: this.refs.music.value,
      specialEffects: this.refs.specialEffects.value,
      directing: this.refs.directing.value,
      humor: this.refs.humor.value,
      kidsFriendly: this.refs.kidsFriendly.value,
      comment: this.refs.comment.value
    }
    this.props.onLeaveReview(review)
  }

  render() {
    return (
      <div className='leaveReview'>
        <h2>Leave Review</h2>
        <form onSubmit={this._handleLeaveReview.bind(this)}>
          <input type='number' placeholder='plot (0-100)' ref='plot' />
          <input type='number' placeholder='originality (0-100)' ref='originality' />
          <input type='number' placeholder='acting (0-100)' ref='acting' />
          <input type='number' placeholder='message (0-100)' ref='message' />
          <input type='number' placeholder='realism (0-100)' ref='realism' />
          <input type='number' placeholder='music (0-100)' ref='music' />
          <input type='number' placeholder='specialEffects (0-100)' ref='specialEffects' />
          <input type='number' placeholder='directing (0-100)' ref='directing' />
          <input type='number' placeholder='humor (0-100)' ref='humor' />
          <input type='number' placeholder='kidsFriendly (0-100)' ref='kidsFriendly' />
          <input type='text' placeholder='comment' ref='comment' />

          <button type='submit'>Leave Review</button>
        </form>
      </div>
  )}
}
///////////////////////// LeaveReview Class //////////////////////////////////


export default ReviewsMovie
