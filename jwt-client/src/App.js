import React, { Component } from 'react'
import './App.css'
import clientAuth from './clientAuth'
import Movies from './Movies'

// import movieDB from '../../express-jwt-api/server.js'

// const MovieDB = require('moviedb')('284cd7e07f6f515d10d01253273b60ec')


/////////////////////////////////////////////////////////////
class App extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: null,
      loggedIn: false,
      view: 'movies',
      movies: [],
      tv: []
    }
  }

  componentDidMount() {
    const currentUser = clientAuth.getCurrentUser()


    


    this.setState({
      currentUser: currentUser,
      loggedIn: !!currentUser,
      view: 'movies'
    })

    console.log("## Component did mount");
  }

  _signUp(newUser) {
    clientAuth.signUp(newUser).then((data) => {
      console.log(data)
      this.setState({
        view: 'login'
      })
    })
  }

  _logIn(credentials) {
    console.log(credentials)
    clientAuth.logIn(credentials).then(user => {
      this.setState({
        currentUser: user,
        loggedIn: true,
        view: 'home'
      })
    })
  }

  _logOut() {
    clientAuth.logOut().then(message => {
      console.log(message)
      this.setState({
        currentUser: null,
        loggedIn: false,
        view: 'home'
      })
    })
  }

  _setView(evt) {
    evt.preventDefault()
    const view = evt.target.name
    this.setState({
      view: view
    })
  }

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
          home: <h2>Welcome</h2>,
          login: <LogIn onLogin={this._logIn.bind(this)} />,
          signup: <SignUp onSignup={this._signUp.bind(this)} />,
          movies: <Movies />
        }[this.state.view]}
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
