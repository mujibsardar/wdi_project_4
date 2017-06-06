require('dotenv').load();
const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  usersRoutes = require('./routes/users.js'),
  moviesRoutes = require ('./routes/movies.js'),
  cors = require('cors'),
  // stylus = require('stylus'),
  // movieDB = require('moviedb')('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODRjZDdlMDdmNmY1MTVkMTBkMDEyNTMyNzNiNjBlYyIsInN1YiI6IjU5MzVhNGJmYzNhMzY4NWMwNzAwMGExMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8iWNSSYo1uL-AmflvgdxqxDgSXAIfpFVvbxK51mHmrE'),
  // movieDB = require('moviedb')(process.env.MOVIEDB_KEY),
  mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/filmview',
  port = process.env.PORT || 3001

// connect to mongodb:
mongoose.connect(mongoUrl, (err) => {
  console.log(err || 'Connected to MongoDB.')
})

// log all incoming requests to the console:
app.use(logger('dev'))

// allow incoming ajax requests from other domains (including other localhost ports)
app.use(cors())

// interpret bodies of data that are included in requests:
app.use(bodyParser.json()) // interpret json bodies
app.use(bodyParser.urlencoded({extended: false})) // interpret form data

// server root route:
app.get('/', (req, res) => {
  res.json({message: "Server root. All API routes start with /api..."})
})

// apply all user routes here:
app.use('/api/users', usersRoutes)
app.use('/api/movies', moviesRoutes)

// listen for incoming http requests:
app.listen(port, (err) => {
  console.log(err || `Server running on ${port}`)
})
