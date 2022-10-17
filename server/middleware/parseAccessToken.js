require('dotenv').config({path: __dirname + '../../.env'});
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const { JWT_SECRET_KEY } = process.env

exports.parseAccessToken = function (req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) { 
    res.status(400).json({ message: 'Token not provided!'})
    return
  }
  
  const { accessToken } = JSON.parse(authHeader.replace('Bearer ', ''))

  jwt.verify(accessToken, JWT_SECRET_KEY, async (err, tokenData) => {
      try {
        if (!tokenData) {
          res.status(401).json({ message: 'AccessToken expired!'})
          return
        }

        const user = await User.findById(tokenData.userId)
        req.user = user
        next()
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
          res.status(400).json({ message: 'Invalid token!'})
          return
        }
    }
  })
}
