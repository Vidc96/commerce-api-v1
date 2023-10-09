const mongoose = require('mongoose')

const orderItemShema = mongoose.Schema({
  quantity: {
    type: Number,
    require: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Product'
  }
})

exports.OrderItem = mongoose.model('OrderItem', orderItemShema)