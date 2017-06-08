import React, {Component} from 'react'
import axios from 'axios'


class ReviewsTV extends Component {


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
        url: '/api/tvReviews/',
        method: 'post',
        data: review
    }).then(response => {
      console.log(response);
      this.setState({
        canLeaveReview: false,
      })
      this.props.leftReview()
  })
}
  ///////////// 11111111 ///////////////////////


  ///////////// 11111111 ///////////////////////
  _closeDetails(evt){
    evt.preventDefault()
    this.props.onClose()
  }
  ///////////// 11111111 ///////////////////////



  ///////////// 11111111 ///////////////////////
  render() {
    var tv = this.props.tv.details
    var title = tv.name
    var overview = tv.overview
    var reviews = this.props.tv.reviews
    var showLeaveReviewBox = this.props.showLeaveReviewBox
    var user = this.props.user
    var thankYouMessage = this.props.thankYouMessage


    return (
      <div className="movieDetails">
        <button className="closeDetails" onClick={this._closeDetails.bind(this)}>X</button>
        <div className="movieInfo">
          <h2>{title}</h2>
          <h5>{overview}</h5>
        </div>
        <Reviews reviews={reviews} />
        {this.state.canLeaveReview && showLeaveReviewBox && <LeaveReview onLeaveReview={this._leaveReview.bind(this)} tv={tv} user={user}/>}
        {thankYouMessage  && <h3>Thank you for your feedback!</h3>}
      </div>
    )
    }
  }
  ///////////// 11111111 ///////////////////////


  ///////////////////////// Reviews Class //////////////////////////////////
  class Reviews extends Component{
      render(){
        var reviews = this.props.reviews

        var avgPlotScore = 0
        var avgOriginalityScore = 0
        var avgActingScore = 0
        var avgInspirationScore = 0
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
          avgInspirationScore += r.inspiration
          avgRealismScore += r.realism
          avgMusicScore += r.music
          avgSpecialEffectsScore += r.specialEffects
          avgDirectingScore += r.directing
          avgHumorScore += r.humor
          avgKidsFriendlyScore += r.kidsFriendly
          avgComments.push(r.comment)
        })

        if(reviews.length > 0){
          avgPlotScore /= reviews.length
          avgOriginalityScore /= reviews.length
          avgActingScore /= reviews.length
          avgInspirationScore /= reviews.length
          avgRealismScore /= reviews.length
          avgMusicScore /= reviews.length
          avgSpecialEffectsScore /= reviews.length
          avgDirectingScore /= reviews.length
          avgHumorScore /= reviews.length
          avgKidsFriendlyScore /= reviews.length
        }


        return (
          <div className="reviews">
            <h3>Rating Scores</h3>
            <ul>
              <li> Plot Score: <span className="scores"> {avgPlotScore}%</span></li>
              <li> Originality Score: <span className="scores"> {avgOriginalityScore}%</span></li>
              <li> Acting Score: <span className="scores"> {avgActingScore}%</span></li>
              <li> Inspiration Score: <span className="scores"> {avgInspirationScore}%</span></li>
              <li> Realism Score: <span className="scores"> {avgRealismScore}%</span></li>
              <li> Music Score: <span className="scores"> {avgMusicScore}%</span></li>
              <li> Special Effects Score: <span className="scores"> {avgSpecialEffectsScore}%</span></li>
              <li> Directing Score: <span className="scores"> {avgDirectingScore}%</span></li>
              <li> Humor Score: <span className="scores"> {avgHumorScore}%</span></li>
              <li> Kids Friendly Score: <span className="scores"> {avgKidsFriendlyScore}%</span></li>
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
      userID: this.props.user._id,
      tvID: this.props.tv.id,
      plot: this.refs.plot.value,
      originality: this.refs.originality.value,
      acting: this.refs.acting.value,
      inspiration: this.refs.inspiration.value,
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
        <h3>Leave Rating Scores</h3>
        <form onSubmit={this._handleLeaveReview.bind(this)}>
          <input type='number' placeholder='Plot (0-100)' ref='plot' />
          <input type='number' placeholder='Originality (0-100)' ref='originality' />
          <input type='number' placeholder='Acting (0-100)' ref='acting' />
          <input type='number' placeholder='Inspiration (0-100)' ref='inspiration' />
          <input type='number' placeholder='Realism (0-100)' ref='realism' />
          <input type='number' placeholder='Music (0-100)' ref='music' />
          <input type='number' placeholder='Special Effects (0-100)' ref='specialEffects' />
          <input type='number' placeholder='Directing (0-100)' ref='directing' />
          <input type='number' placeholder='Humor (0-100)' ref='humor' />
          <input type='number' placeholder='Kids Friendly (0-100)' ref='kidsFriendly' />
          <input type='text' placeholder='Comment (text)' ref='comment' />

          <button type='submit'>Leave Review</button>
        </form>
      </div>
  )}
  }
  ///////////////////////// LeaveReview Class //////////////////////////////////



export default ReviewsTV
