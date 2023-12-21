const createError = require("http-errors");
const Product = require("../../model/Product");
const { validationResult } = require("express-validator");
// Add product
const addProduct = async (req, res, next) => {
  console.log("decodedUser =====================>", req.decodedUser);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, { message: errors.array() }));
    }

    const { name, category, price, quantity, description } = req.body;
    const product = await Product.findOne({ name });
    if (product) {
      return next(createError(400, "Product is already there !"));
    }
    const newProduct = new Product({
      name,
      category,
      price,
      quantity,
      description,
      image: `uploads/${req.file?.filename}`,
    });
    await newProduct.save();
    res.status(200).json({ message: "Added new product !" });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Product listing
const productList = async (req, res) => {
  /** search with product "name" - queryParams
  filter with "catgory" - queryParams **/
  console.log("req.params ==========================>", req.query);
  try {
    const search = req.query.hasOwnProperty("name")
      ? {
          name: { $regex: req.query?.name, $options: "i" },
        }
      : req.query;

    console.log("search ========>", search);

    const allProducts = await Product.find(search).populate("category");
    res.status(200).json({ data: allProducts });
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params?.id).lean();

    if (product) {
      const deletedProduct = await Product.deleteOne({
        _id: req.params.id,
      });
      console.log("deletedProduct", deletedProduct);
      return res.status(200).json({ message: "Deleted Product successfully!" });
    }
    next(createError(400, "No product is available with this Id."));
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(400, { message: errors.array() }));
    }

    const { name, category, price, quantity, description } = req.body;
    const updateObject = {
      name,
      category,
      price,
      quantity,
      description,
      image: req.file?.filename,
    };
    console.log("updateObject ===>", updateObject);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.query?.id,
      updateObject
    );
    console.log("updatedProduct ====>", updatedProduct);
    res.status(200).json({ message: "Product Updated Successfully !" });
  } catch (error) {
    next(createError(400, error.message));
  }
};

module.exports = { addProduct, updateProduct, deleteProduct, productList };
