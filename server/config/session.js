require('dotenv').config({path: __dirname + '../../.env'});
const { SESSION_SECRET_KEY } = process.env

exports.sessionConfig = {
  secret: SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    httpOnly: true
  }
}