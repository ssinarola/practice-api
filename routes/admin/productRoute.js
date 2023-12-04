const express = require("express");

const router = express.Router();
const isAuth = require("../../middleware/auth");
const {addProduct, productList, deleteProduct, updateProduct} = require("../../controller/admin/product");
const upload = require("../../middleware/fileUpload");

// note - upload.single("image")/upload.array("image") => here "image" name should be same with key when we pass image

router.post("/add", upload.single('image'), isAuth, addProduct);
router.get("/list", isAuth, productList);
router.delete("/delete/:id", isAuth, deleteProduct);
router.put("/update", upload.single('image'), isAuth, updateProduct);

module.exports = router;
