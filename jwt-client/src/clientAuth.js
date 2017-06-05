import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'http://localhost:3001'





const clientAuth = {
  // whenever this method is called (from inside login, and at the end of this file when the app is loaded), it looks for a token in localStorage, and sets axios to attach the token in the header of all subsequent requests:
//**********************************************************
  setTokenHeader: () => {
    const token = localStorage.getItem('token')
    if(token) {
      axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
    }
  },
  signUp: (userInfo) => {
    return axios({
      url: '/api/users',
      method: 'post',
      data: userInfo
    })
  },

// when this method is called and the server sends a response back, save the token to localStorage, and use clientAuth.setTokenHeader() to make all subsequent requests include the token.

// Then return the DECODED token (the current user's info) to the next .then(). See: App.js, login() method:

  logIn: (credentials) => {
    return axios({
      url: '/api/users/login',
      method: 'post',
      data: credentials
    })
    .then(res => {
      if(res.data.token) {
        localStorage.setItem('token', res.data.token)
        clientAuth.setTokenHeader()
        return jwt_decode(res.data.token)
      } else {
        return false
      }
    })
  },

// this is used to set the current user in the App.js main component's state, based on the presence of a token:
  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    return token ? jwt_decode(token) : null
  },

// clear token from localStorage, and stop sending the token in subsequent requests:
  logOut: () => {
    return new Promise((resolve) => {
      localStorage.clear()
      delete axios.defaults.headers.common['x-access-token']
      resolve("bye.")
    })
  }


///////////////////////////////////////////
  //**********************************************************

}

// look in localStorage for a token when the app loads, and if there is one, set all future axios http requests to include the token for authorization in the backend:
clientAuth.setTokenHeader()

export default clientAuth
