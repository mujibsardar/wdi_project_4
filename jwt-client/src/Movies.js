import React, {Component} from 'react'
// import clientAuth from './clientAuth.js'
import axios from 'axios'
const baseURL = 'http://image.tmdb.org/t/p/w500'

class Movies extends Component {


  ///////////// state ///////////////////////
  state = {
    movies: [],
    tvs: []
  }
  ///////////// state ///////////////////////



  ///////////// 11111111 ///////////////////////
  componentDidMount() {
    axios ({
        url: '/api/movies',
        method: 'get'
    }).then(res => {
        console.log("## then res: ", res.data.results);
        var discoverMovies = res.data.results
        this.setState ({
          movies: discoverMovies
        })
    })
  }
  ///////////// 11111111 ///////////////////////


  ///////////// 11111111 ///////////////////////
  render() {
    var movie = this.state.movies
    var moviePosterPaths = []
    movie.forEach(function(m){
      moviePosterPaths.push(baseURL + m.poster_path);
    })
    return (
  <div className="row">
    <div className="row__inner">

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-1.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-2.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-3.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-4.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-5.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-6.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-7.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-8.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-9.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-10.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-11.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-12.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-13.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-14.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-15.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-16.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-17.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-18.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

      <div className="tile">
        <div className="tile__media">
          <img className="tile__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-19.jpg" alt=""  />
        </div>
        <div className="tile__details">
          <div className="tile__title">
            Top Gear
          </div>
        </div>
      </div>

    </div>
  </div>

    )
  }
  ///////////// 11111111 ///////////////////////

}

export default Movies
