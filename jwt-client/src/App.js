import React, { Component } from 'react'
import './App.css'
import clientAuth from './clientAuth'
import Movies from './components/Movies'
import TVSeries from './components/TVSeries'
import ReviewsMovie from './components/ReviewsMovie'
import ReviewsTV from './components/ReviewsTV'
import axios from 'axios'

/////////////////////////////////////////////////////////////
class App extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: null,
      loggedIn: false,
      view: '',
      movies: [],
      tvSeries: [],
      currentMovie: null,
      currentTV: null,
      showLeaveReviewBox: true,
      thankYouMessage: false
    }
  }

////////////////// 111111111///////////////////////
  componentDidMount() {
    const currentUser = clientAuth.getCurrentUser()
    axios ({
        url: '/api/movies',
        method: 'get'
    }).then(response => {
        axios ({
          url: '/api/tvs',
          method: 'get'
      }).then(res => {

        var tvDiscovery = res.data.results
        var discoverMovies = response.data.results

        this.setState ({
          movies: discoverMovies,
          tvSeries: tvDiscovery,
          currentUser: currentUser,
          loggedIn: !!currentUser,
          view: ''
        })
      })
    })
  }
  ////////////////// 111111111///////////////////////



  ////////////////// 111111111///////////////////////
  _signUp(newUser) {
    clientAuth.signUp(newUser).then((data) => {
      console.log(data)
      this.setState({
        view: 'login'
      })
    })
  }
  ////////////////// 111111111///////////////////////



  ////////////////// 111111111///////////////////////
  _logIn(credentials) {
    console.log(credentials)
    clientAuth.logIn(credentials).then(user => {
      this.setState({
        currentUser: user,
        loggedIn: true,
        view: ''
      })
    })
  }
  ////////////////// 111111111///////////////////////


  ////////////////// 111111111///////////////////////
  _logOut() {
    clientAuth.logOut().then(message => {
      console.log(message)
      this.setState({
        currentUser: null,
        loggedIn: false,
        view: ''
      })
    })
  }
  ////////////////// 111111111///////////////////////


  ////////////////// 111111111///////////////////////
  _setView(evt) {
    evt.preventDefault()
    const view = evt.target.name
    this.setState({
      view: view
    })
  }
  ////////////////// 111111111///////////////////////



  ////////////////// 111111111///////////////////////
  _showDetailsMovie(evt) {
    // Bad way of getting movie id?
    var movieID = evt.target.parentNode.id
    const currentUser = clientAuth.getCurrentUser()
    axios ({
        url: '/api/movies/' + movieID,
        method: 'get'
    }).then(response => {
        axios ({
            url: '/api/movieReviews/' + movieID,
            method: 'get'
        }).then(res => {


          if(currentUser){
            axios ({
              url: '/api/movieReviews/movieAndUser/' + movieID + '/' + currentUser._id,
              method: 'get'
            }).then(r => {
              this.setState ({
                currentMovie: {details: response.data, reviews: res.data},
                showLeaveReviewBox: !r.data,
                thankYouMessage: false
              })
            })
        } else {
          this.setState ({
            currentMovie: {details: response.data, reviews: res.data},
            showLeaveReviewBox: false,
            thankYouMessage: false
          })
        }

    })
  })
}

  ////////////////// 111111111///////////////////////



  ////////////////// 111111111///////////////////////
  _showDetailsTV(evt) {
    // Bad way of getting movie id?
    var tvID = evt.target.parentNode.id
    const currentUser = clientAuth.getCurrentUser()
    axios ({
        url: '/api/tvs/' + tvID,
        method: 'get'
    }).then(response => {
        axios ({
            url: '/api/tvReviews/' + tvID,
            method: 'get'
        }).then(res => {
          if(currentUser){
            axios ({
              url: '/api/tvReviews/tvAndUser/' + tvID + '/' + currentUser._id,
              method: 'get'
            }).then(r => {
              this.setState ({
                currentTV: {details: response.data, reviews: res.data},
                showLeaveReviewBox: !r.data,
                thankYouMessage: false
              })
            })
        } else {
          this.setState ({
            currentTV: {details: response.data, reviews: res.data},
            showLeaveReviewBox: false,
            thankYouMessage: false
          })
        }
    })
  })
  }
  ////////////////// 111111111///////////////////////


  ////////////////// 111111111///////////////////////
  _closeDetails(evt){
    this.setState ({
      currentMovie: null,
      currentTV: null
    })
  }
  ////////////////// 111111111///////////////////////

  ////////////////// 111111111///////////////////////
  _leftReview(evt){
    this.setState ({
      thankYouMessage: true
    })
  }
  ////////////////// 111111111///////////////////////


  ////////////////// 111111111///////////////////////
  render() {
    var currentUser = this.state.currentUser
    var name = ""
    if(currentUser){
      name = (currentUser.name).charAt(0).toUpperCase() + (currentUser.name).slice(1)
    }

    return (
      <div className="container">

        <div className="App-header">
          {this.state.loggedIn ? 'Welcome ' + name  : 'Please login to start rating'}
        </div>

          {!this.state.loggedIn && (
            <button className="sessionButton signupButton" name='signup' onClick={this._setView.bind(this)}>Sign Up</button>
          )}

          {!this.state.loggedIn && (
            <button className="sessionButton loginButton" name='login' onClick={this._setView.bind(this)}>Log In</button>
          )}

          {this.state.loggedIn && (
            <button className="sessionButton logoutButton" onClick={this._logOut.bind(this)}>Log Out</button>
          )}

        {{
          home: <h2>Home View</h2>,
          login: <LogIn onLogin={this._logIn.bind(this)} />,
          signup: <SignUp onSignup={this._signUp.bind(this)} />,
        }[this.state.view]}
        <Movies movies={this.state.movies} showDetailsMovie={this._showDetailsMovie.bind(this)}/>
        {this.state.currentMovie && <ReviewsMovie movie={this.state.currentMovie} user={currentUser} showLeaveReviewBox={this.state.showLeaveReviewBox} thankYouMessage={this.state.thankYouMessage} onClose={this._closeDetails.bind(this)} leftReview={this._leftReview.bind(this)}/>}
        <TVSeries tvSeries={this.state.tvSeries} showDetailsTV={this._showDetailsTV.bind(this)}/>
        {this.state.currentTV && <ReviewsTV tv={this.state.currentTV} user={currentUser} showLeaveReviewBox={this.state.showLeaveReviewBox} thankYouMessage={this.state.thankYouMessage} onClose={this._closeDetails.bind(this)} leftReview={this._leftReview.bind(this)} />}
      </div>
    );
  }
}
/////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////
class SignUp extends Component {
  _handleSignup(evt) {
    evt.preventDefault()
    const newUser = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.onSignup(newUser)
  }

  render() {
    return (
      <div className='formContainer signUpContainer'>
        Sign Up
        <form className="form signUpForm" onSubmit={this._handleSignup.bind(this)}>
          <input type='text' placeholder='Name' ref='name' />
          <input type='text' placeholder='Email' ref='email' />
          <input type='password' placeholder='Password' ref='password' />
          <button type='submit'>Create Account</button>
        </form>
      </div>
    )
  }
}
/////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////
class LogIn extends Component {
  _handleLogin(evt) {
    evt.preventDefault()
    const credentials = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    this.props.onLogin(credentials)
  }

  render() {
    return (
      <div className='formContainer loginContainer'>
         Log In
        <form className="form loginForm" onSubmit={this._handleLogin.bind(this)}>
          <input type='text' placeholder='Email' ref='email' />
          <input type='password' placeholder='Password' ref='password' />
          <button type='submit'>Log In</button>
        </form>
      </div>
    )
  }
}
/////////////////////////////////////////////////////////////



export default App;
