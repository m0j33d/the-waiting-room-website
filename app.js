const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser')

const indexRoute = require('./src/routes/index')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use(passport.initialize());



/* GET home page. */
app.get('/', function (req, res) {
  return res.status(200).send('Welcome')
});

app.use('/api/v1', indexRoute);


// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(500).json({
    error: err.message
  })
});

module.exports = app;
