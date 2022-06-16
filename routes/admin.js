const express = require("express");
const adminRouter = express.Router();

const admin = require("../middleware/admin");

const {
  addProduct,
  getProduct,
  deleteProduct,
  getOrders,
  changeOrderStatus,
  analystics,
} = require("../controllers/admin-controller");

adminRouter.post("/admin/add-product", admin, addProduct);
adminRouter.get("/admin/get-products", admin, getProduct);
adminRouter.post("/admin/delete-product", admin, deleteProduct);
adminRouter.get("/admin/get-orders", admin, getOrders);
adminRouter.post("/admin/change-order-status", admin, changeOrderStatus);
adminRouter.get("/admin/analystics", admin, analystics);

module.exports = adminRouter;
