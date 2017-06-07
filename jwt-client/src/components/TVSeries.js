import React, {Component} from 'react'
// import clientAuth from './clientAuth.js'
// import axios from 'axios'
const baseURL = 'http://image.tmdb.org/t/p/w500'

class TVSeries extends Component {

  ///////////// 11111111 ///////////////////////
  componentDidMount() {

  }
  ///////////// 11111111 ///////////////////////


  ///////////// 11111111 ///////////////////////
  render() {

    var tvseries = this.props.tvSeries
    var posterURL = ""

    const htmlTVArray = tvseries.map( (m) => {
      posterURL = baseURL + m.poster_path
      return (
        <div key={m.id} id={m.id} className="tile" onClick={this.props.getReviewsTV.bind(this) }>
          <div className="tile__media" >
            <img  className="tile__img" src={posterURL} alt=""   />
          </div>
          <div className="tile__details">
            <div className="tile__title">
              {m.title}
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="row">
        <div className="row__inner">
          {htmlTVArray}
        </div>
      </div>
    )
  }
  ///////////// 11111111 ///////////////////////

}

export default TVSeries
