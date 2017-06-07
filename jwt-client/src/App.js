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
      currentTV: null
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
  _getReviewsMovie(evt) {
    var id = evt.target.parentNode.id

    axios ({
        url: '/api/movies/' + id,
        method: 'get'
    }).then(response => {
      this.setState ({
        currentMovie: response.data
      })
    })
  }
  ////////////////// 111111111///////////////////////


  ////////////////// 111111111///////////////////////
  _getReviewsTV(evt) {
    var id = evt.target.parentNode.id

    axios ({
        url: '/api/tvs/' + id,
        method: 'get'
    }).then(response => {
      this.setState ({
        currentTV: response.data
      })
    })
  }
  ////////////////// 111111111///////////////////////


  ////////////////// 111111111///////////////////////
  render() {
    return (
      <div className="container">

        <div className="App-header">
          <h2>{this.state.loggedIn ? this.state.currentUser.name : 'Not Logged In'}</h2>
        </div>

          {!this.state.loggedIn && (
            <button name='signup' onClick={this._setView.bind(this)}>Sign Up</button>
          )}

          {!this.state.loggedIn && (
            <button name='login' onClick={this._setView.bind(this)}>Log In</button>
          )}

          {this.state.loggedIn && (
            <button onClick={this._logOut.bind(this)}>Log Out</button>
          )}
        {{
          home: <h2>Home View</h2>,
          login: <LogIn onLogin={this._logIn.bind(this)} />,
          signup: <SignUp onSignup={this._signUp.bind(this)} />,
        }[this.state.view]}
        <Movies movies={this.state.movies} getReviewsMovie={this._getReviewsMovie.bind(this)}/>
        {this.state.currentMovie && <ReviewsMovie movie={this.state.currentMovie}/>}
        <TVSeries tvSeries={this.state.tvSeries} getReviewsTV={this._getReviewsTV.bind(this)}/>
        {this.state.currentTV && <ReviewsTV tvSeries={this.state.currentTV}/>}

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
      <div className='container'>
        <h2>Sign Up</h2>
        <form onSubmit={this._handleSignup.bind(this)}>
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
      <div className='container'>
        <h2>Log In</h2>
        <form onSubmit={this._handleLogin.bind(this)}>
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
