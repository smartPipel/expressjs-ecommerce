const express = require("express");
const userRouter = express.Router();

const auth = require("../middleware/auth");
const {
  addToCart,
  myOrders,
  order,
  removeFromCart,
  saveUserAddress,
} = require("../controllers/user-controller");

userRouter.get("/api/add-to-cart", auth, addToCart);
userRouter.delete("/api/remove-from-cart/:id", auth, removeFromCart);
userRouter.post("/api/save-user-address", auth, saveUserAddress);
userRouter.post("/api/order", auth, order);
userRouter.get("/api/orders/me", auth, myOrders);

module.exports = userRouter;
