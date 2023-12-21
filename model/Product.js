const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product Name is Required'], unique: true},
  image: { type: String, required: [true, 'Product must have image'] },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: [true, 'Product must belong to a category']
  },
  price: { type: Number, required: [true, 'Product Price is Required'] },
  quantity: {
    type: Number,
    required: [[true, 'Product Quantity is Required']]
  },
  description: { type: String }
}, {timestamps: true})

module.exports = mongoose.model('products', ProductSchema)
