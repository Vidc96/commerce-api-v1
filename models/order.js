const mongoose = require('mongoose')

const orderShema = mongoose.Schema({
  orderItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true
  }],
  shippingAddress1: {
    type: String,
    required: true
  },
  shippingAddress2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  country:{
    type: String,
    required: true
  },
  status: {
    tyoe: String,
    required: true,
    default: 'Pending',
  },
  totalPrice: {
    type: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  },
})

orderShemaShema.virtual('id').get(function () {
  return this._id.toHexString()
})

orderShemaShema.set('toJSON', {
  virtuals: true,
})

exports.Order = mongoose.model('Order', orderShema)