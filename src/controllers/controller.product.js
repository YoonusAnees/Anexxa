const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../services/service.product");

exports.addProduct = async (req, res) => {
  try {
    const p = await createProduct(req.body);
    res.json(p);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.listProducts = async (req, res) => {
  const data = await getProducts();
  res.json(data);
};

exports.editProduct = async (req, res) => {
  try {
    const p = await updateProduct(req.params.id, req.body);
    res.json(p);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
