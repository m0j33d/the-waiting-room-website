import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser'

import {router as indexRoute} from './src/routes/index.js'

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

export { app };
