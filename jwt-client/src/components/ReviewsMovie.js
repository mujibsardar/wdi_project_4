import React, {Component} from 'react'
import axios from 'axios'


class ReviewsMovie extends Component {

  constructor(){
    super()
    this.state = {
      canLeaveReview: true,
    }
  }


  ///////////// 11111111 ///////////////////////
  componentDidMount() {

  }
  ///////////// 11111111 ///////////////////////


  ///////////// 11111111 ///////////////////////
  _leaveReview(review) {
    console.log("_leaveReview ENTERED: ", review);
    axios ({
        url: '/api/movieReviews/',
        method: 'post',
        data: review
    }).then(response => {
      console.log("_leaveReview SUCCESS: ", response);
      this.setState = {
        canLeaveReview: false
      }
    })
  }
  ///////////// 11111111 ///////////////////////



  ///////////// 11111111 ///////////////////////
  render() {
    var title = ""
    var overview = ""

    var movie = this.props.movie.details
    title = movie.title
    overview = movie.overview

    return (
      <div className="movieDetails">
        <h2>{title}</h2>
        <h5>{overview}</h5>


        {{
          true: <LeaveReview onLeaveReview={this._leaveReview.bind(this)} movie={movie} />,
        }[this.state.canLeaveReview]}

      </div>
    )
    }
  }
  ///////////// 11111111 ///////////////////////




/////////////////////////////////////////////////////////////
class LeaveReview extends Component {
  _handleLeaveReview(evt) {
    console.log("props ID test: ", this.props.movie.id);
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
      <div className='container'>
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
/////////////////////////////////////////////////////////////


export default ReviewsMovie
