const {
  addCategory,
  categoryList,
  deleteCategory,
  updateCategory,
} = require("../../controller/admin/category");
const isAuth = require("../../middleware/auth");

const router = require("express").Router();

router.use(isAuth);
router.post("/add", addCategory);
router.get("/list", categoryList);
router.delete("/delete/:id", deleteCategory);
router.put("/update", updateCategory);

module.exports = router;
