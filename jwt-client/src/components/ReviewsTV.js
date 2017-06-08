import React, {Component} from 'react'

class ReviewsTV extends Component {


  constructor(){
    super()
    this.state = {
      canLeaveReview: true,
      thankYouMessage: false
    }
  }

  
  ///////////// 11111111 ///////////////////////
  componentDidMount() {

  }
  ///////////// 11111111 ///////////////////////



  ///////////// 11111111 ///////////////////////
  render() {
    var title = ""
    var overview = ""

    var tv = this.props.tvSeries
    title = tv.name
    overview = tv.overview

    return (
      <div className="movieDetails">
        <h2>{title}</h2>
        <h5>{overview}</h5>
      </div>
    )
  }
  ///////////// 11111111 ///////////////////////

}

export default ReviewsTV
