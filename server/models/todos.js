const mongoose = require('mongoose')

const ToDo = mongoose.model('ToDo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

const todo = new ToDo()
console.log(todo)

module.exports = {ToDo}
