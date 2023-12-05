const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: [true, "Product must have image"] },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: [true, "Product must belong to a category"],
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
});

const productModel = mongoose.model("products", ProductSchema);
module.exports = productModel;
