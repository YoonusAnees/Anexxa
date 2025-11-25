const {
  createProduct,
  getProducts,
  updateStock,
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

exports.allProducts = async (req, res) => {
  try {
    const list = await getProducts();
    res.json(list);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.editStock = async (req, res) => {
  try {
    const updated = await updateStock(req.params.id, req.body.stock);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const out = await deleteProduct(req.params.id);
    res.json(out);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
