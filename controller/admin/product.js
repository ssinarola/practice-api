const ProductModel = require("../../model/ProductModel");

// Add product
const addProduct = async (req, res, next) => {
  console.log("decodedUser =====================>", req.decodedUser);
  console.log("req.body ========================>", req.body);
  console.log("req.file ========================>", req.file);

  const product = await ProductModel.findOne({ name: req.body.name });
  console.log("product =========>", product?.id);
  try {
    if (product?.id) {
      res.json({ status: 200, message: "Product is already there !" });
    } else {
      await ProductModel.create({
        name: req.body.name,
        category: req.body.category,
        price: req.body?.price,
        quantity: req.body?.quantity,
        description: req.body?.description,
        image: `uploads/${req.file?.filename}`,
      });
      res.json({ status: 200, message: "Added new product !" });
    }
  } catch (error) {
    console.log("error addProduct =========================>", error.message);
    res.json({ status: 400, message: error.message });
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

    const allProducts = await ProductModel.find(search).populate("category");


    console.log("allProducts =============================>", allProducts);
    // console.log("data =============================>", data);
    res.json({ status: 200, data:allProducts });
  } catch (error) {
    res.json({ status: 400, message: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  console.log("req.params ======================>", req.params.id);
  try {
    const product = await ProductModel.findById(req.params.id);
    console.log("product ============>", product);

    if (product) {
      const deletedProduct = await ProductModel.deleteOne({
        _id: req.params.id,
      });
      console.log("deletedProduct", deletedProduct);
      res.json({ status: 200, message: "Deleted Product successfully!" });
    } else {
      res.json({
        status: 400,
        message: "No product is available with this Id.",
      });
    }
  } catch (error) {
    res.json({ status: 400, message: error.message });
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
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.query.id,
      updateObject
    );
    console.log("updatedProduct ====>", updatedProduct);
    res.json({ status: 200, message: "Product Updated Successfully !" });
  } catch (error) {
    res.json({ status: 400, message: error.message });
  }
};

module.exports = { addProduct, updateProduct, deleteProduct, productList };
