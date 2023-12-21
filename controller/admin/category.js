const createError = require("http-errors");
const Category = require("../../model/Category");

// Add Category
const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findOne(name);
    if (category) {
      res.status(200).json({ message: "Category is already there !" });
    }
    const newCategory = new Category({
      name,
      description,
    });
    await newCategory.save();
    res.status(200).json({ message: "Added new category !" });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Category listing
const categoryList = async (req, res) => {
  try {
    const allCategory = await Category.find();
    console.log("allCategory =============================>", allCategory);
    res.status(200).json({ data: allCategory });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Delete Category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params?.id);
    console.log("category ============>", category);

    if (category) {
      const deletedCategory = await Category.deleteOne({
        _id: req.params.id,
      });
      console.log("deletedCategory", deletedCategory);
      return res
        .status(200)
        .json({ message: "Deleted category successfully!" });
    }

    next(createError(400, "No category is available !"));
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Update Category
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const updateObject = { name, description };
    await Category.findByIdAndUpdate(req.body.id, updateObject);
    res.status(200).json({ message: "Updated category Successfully !" });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports = {
  addCategory,
  categoryList,
  deleteCategory,
  updateCategory,
};
