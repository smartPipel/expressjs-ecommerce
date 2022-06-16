/**
 *
 * * Rating shcema
 *
 * {
 *
 *      @param String userId required
 *      @param Number rating required
 *
 * }
 *
 */

const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = ratingSchema;
