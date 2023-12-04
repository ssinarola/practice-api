const CategoryModel = require("../../model/CategoryModel");

// Add Category
const addCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ name: req.body.name });
    console.log("category =========>", category?.id);
    if (category?.id) {
      res.json({ status: 200, message: "Category is already there !" });
    } else {
      await CategoryModel.create({
        name: req.body.name,
        description: req.body?.description,
      });
      res.json({ status: 200, message: "Added new category !" });
    }
  } catch (error) {
    console.log("error addCategory =========================>", error.message);
    res.json({ status: 400, message: error.message });
  }
};

// Category listing
const categoryList = async (req, res) => {
  try {
    const allCategory = await CategoryModel.find();
    console.log("allCategory =============================>", allCategory);
    res.json({ status: 200, data: allCategory });
  } catch (error) {
    res.json({ status: 400, message: error.message });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  console.log("req.params ======================>", req.params, req.query);
  try {
    const category = await CategoryModel.findById(req.params.id);
    console.log("category ============>", category);

    if (category) {
      const deletedCategory = await CategoryModel.deleteOne({
        _id: req.params.id,
      });
      console.log("deletedCategory", deletedCategory);
      res.json({
        status: 200,
        message: "Deleted category successfully!",
        data: { ...deletedCategory },
      });
    } else {
      res.json({
        status: 400,
        message: "No category is available !",
      });
    }
  } catch (error) {
    res.json({ status: 400, message: error.message });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    console.log("req.body ====>", req.body);

    const updateObject = {
      name: req.body.name,
      description: req.body.description,
    };
    await CategoryModel.findByIdAndUpdate(req.body.id, updateObject);

    res.json({ status: 200, message: "Updated category Successfully !" });
  } catch (error) {
    console.log("error updateCategory ==============>", error);
    res.json({ status: 400, message: error.message });
  }
};

module.exports = {
  addCategory,
  categoryList,
  deleteCategory,
  updateCategory,
};
