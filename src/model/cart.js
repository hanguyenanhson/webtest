const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cart = new mongoose.Schema({
    items: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  });
  

  
  module.exports = mongoose.model('cart', cart);