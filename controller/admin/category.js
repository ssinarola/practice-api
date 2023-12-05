const Category = require("../../model/Category");

// Add Category
const addCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.name });
    console.log("category =========>", category);
    if (category) {
      res.status(200).json({ message: "Category is already there !" });
    }
    await Category.create({
      name: req.body.name,
      description: req.body?.description,
    });
    res.status(200).json({ message: "Added new category !" });
  } catch (error) {
    console.log("error addCategory =========================>", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Category listing
const categoryList = async (req, res) => {
  try {
    const allCategory = await Category.find();
    console.log("allCategory =============================>", allCategory);
    res.status(200).json({ data: allCategory });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    console.log("category ============>", category);

    if (category) {
      const deletedCategory = await Category.deleteOne({
        _id: req.params.id,
      });
      console.log("deletedCategory", deletedCategory);
      res.status(200).json({ message: "Deleted category successfully!" });
    }
    res.status(400).json({
      message: "No category is available !",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const updateObject = {
      name: req.body.name,
      description: req.body.description,
    };
    await Category.findByIdAndUpdate(req.body.id, updateObject);

    res.status(200).json({ message: "Updated category Successfully !" });
  } catch (error) {
    console.log("error updateCategory ==============>", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addCategory,
  categoryList,
  deleteCategory,
  updateCategory,
};
