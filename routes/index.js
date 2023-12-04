const express = require("express");

const authRoute = require("./authRoute");
const productRoute = require("./admin/productRoute");
const categoryRoute = require("./admin/categoryRoute");

const router = express.Router();
router.use("/auth", authRoute);
router.use("/product", productRoute);
router.use("/category", categoryRoute)

module.exports = router;
