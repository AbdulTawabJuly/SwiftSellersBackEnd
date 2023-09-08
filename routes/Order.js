const express = require("express");
const {
  createOrder,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
  fexthAllOrders,
} = require("../controller/Order");

const router = express.Router();

// /products is already added in base path
router
  .post("/", createOrder)
  .get("/own/", fetchOrdersByUser)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder)
  .get("/", fexthAllOrders);

exports.router = router;
