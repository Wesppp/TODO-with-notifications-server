const {Schema, model} = require('mongoose')

const token = new Schema({
  tokenId: String,
  userId: String,
})

module.exports = model('Token', token)