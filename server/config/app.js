require('dotenv').config({path: __dirname + '../../.env'});
const { JWT_SECRET_KEY } = process.env

module.exports = {
  jwt: {
    secret: JWT_SECRET_KEY,
    tokens: {
      access: {
        type: 'access',
        expiresIn: '30m'
      },
      refresh: {
        type: 'refresh',
        expiresIn: '24h'
      }
    }
  }
}