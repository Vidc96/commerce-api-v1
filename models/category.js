const mongoose = require('mongoose')

const categoryShema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true
  }
})

exports.Category = mongoose.model('Category', categoryShema)