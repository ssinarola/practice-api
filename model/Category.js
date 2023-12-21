const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Category name is Required'], unique: true },
  description: { type: String }
}, {timestamps: true})

module.exports = mongoose.model('category', CategorySchema)
