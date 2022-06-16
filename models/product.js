/**
 * * Product schema
 *
 * {
 *      @param String name required
 *      @param String description required
 *      @param String[] image required
 *      @param Number quantity required
 *      @param Number price required
 *      @param String category required
 *      @param rating from ratingSchema
 *
 *
 * }
 */

const mongoose = require("mongoose");
const ratingSchema = require("./rating");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: [ratingSchema],
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };
