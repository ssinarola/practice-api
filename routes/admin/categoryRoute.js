const { addCategory, categoryList, deleteCategory, updateCategory } = require("../../controller/admin/category");
const isAuth = require("../../middleware/auth");

const router = require("express").Router();


router.post("/add", isAuth, addCategory);
router.get("/list", isAuth, categoryList);
router.delete("/delete/:id", isAuth, deleteCategory);
router.put("/update",isAuth, updateCategory)


module.exports = router;