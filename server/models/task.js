const {Schema, model} = require('mongoose')

const task = new Schema({
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
})

module.exports = model('Task', task)