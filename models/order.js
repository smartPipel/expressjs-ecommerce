/**
 *
 * * Order schema
 *
 * {
 *
 *      @param productSchema[] products{ product, quantity } required
 *      @param Number totalPrice required
 *      @param String address required
 *      @param String userId required
 *      @param Number orderAt required
 *      @param Number status required
 *
 * }
 *
 */

const mongoose = require("mongoose");
const { productSchema } = require("./product");

const orderSchema = mongoose.Schema({
  products: [
    {
      product: productSchema,
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  totalPrice: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  orderAt: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
