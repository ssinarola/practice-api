const express = require("express");

const router = express.Router();
const isAuth = require("../../middleware/auth");
const {
  addProduct,
  productList,
  deleteProduct,
  updateProduct,
} = require("../../controller/admin/product");
const upload = require("../../middleware/fileUpload");

router.use(isAuth);
// note - upload.single("image")/upload.array("image") => here "image" name should be same with key when we pass image
router.post("/add", upload.single("image"), addProduct);
router.get("/list", productList);
router.delete("/delete/:id", deleteProduct);
router.put("/update", upload.single("image"), updateProduct);

module.exports = router;
