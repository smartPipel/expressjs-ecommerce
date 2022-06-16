const express = require("express");
const productRouter = express.Router();

const auth = require("../middleware/auth");
const {
  dealOfTheDay,
  getProducts,
  rateProduct,
  searchProduct,
} = require("../controllers/product-controller");

productRouter.get("/api/products/", auth, getProducts);
productRouter.get("/api/products/search/:name", auth, searchProduct);
productRouter.post("/api/rate-product", auth, rateProduct);
productRouter.post("/api/deal-of-day", auth, dealOfTheDay);

module.exports = productRouter;
