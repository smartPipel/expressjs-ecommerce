const express = require("express");
const productRouter = express.Router();

const auth = require("../middleware/auth");
const {
  dealOfTheDay,
  getProducts,
  rateProduct,
  searchProduct,
} = require("../controllers/product-controller");

productRouter.get("/products/", auth, getProducts);
productRouter.get("/products/search/:name", auth, searchProduct);
productRouter.post("/rate-product", auth, rateProduct);
productRouter.post("/deal-of-day", auth, dealOfTheDay);

module.exports = productRouter;
