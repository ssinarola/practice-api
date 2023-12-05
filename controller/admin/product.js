const Product = require("../../model/Product");

// Add product
const addProduct = async (req, res, next) => {
  console.log("decodedUser =====================>", req.decodedUser);
  console.log("req.body ========================>", req.body);
  console.log("req.file ========================>", req.file);

  try {
    const product = await Product.findOne({ name: req.body.name });

    if (product) {
      res.status(200).json({ message: "Product is already there !" });
    }
    await Product.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body?.price,
      quantity: req.body?.quantity,
      description: req.body?.description,
      image: `uploads/${req.file?.filename}`,
    });
    res.status(200).json({ message: "Added new product !" });
  } catch (error) {
    console.log("error addProduct =========================>", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Product listing
const productList = async (req, res) => {
  /** search with product "name" - queryParams
  filter with "catgory" - queryParams **/

  console.log("req.params ==========================>", req.query);

  try {
    let search = req.query.hasOwnProperty("name")
      ? {
          name: { $regex: req.query.name, $options: "i" },
        }
      : req.query;

    console.log("search ========>", search);

    const allProducts = await Product.find(search).populate("category");

    console.log("allProducts =============================>", allProducts);
    // console.log("data =============================>", data);
    res.status(200).json({ data: allProducts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  console.log("req.params ======================>", req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    console.log("product ============>", product);

    if (product) {
      const deletedProduct = await Product.deleteOne({
        _id: req.params.id,
      });
      console.log("deletedProduct", deletedProduct);
      res.status(200).json({ message: "Deleted Product successfully!" });
    }
    res.status(400).json({
      message: "No product is available with this Id.",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  console.log("req.body ====================>", req.body);
  try {
    const updateObject = {
      name: req.body.name,
      category: req.body.category,
      price: req.body?.price,
      quantity: req.body?.quantity,
      description: req.body?.description,
      image: req.file?.filename,
    };
    console.log("updateObject ===>", updateObject);
    const updatedProduct = await Product.findByIdAndUpdate(
      req.query.id,
      updateObject
    );
    console.log("updatedProduct ====>", updatedProduct);
    res.status(200).json({ message: "Product Updated Successfully !" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addProduct, updateProduct, deleteProduct, productList };
