const mongoose = require('mongoose')

const categoryShema = mongoose.Schema({
  
  name: {
    type: String,
    require: true
  },
  color: {
    type: String
  },
  icon: {
    type: String
  }  

})

exports.Category = mongoose.model('Category', categoryShema)