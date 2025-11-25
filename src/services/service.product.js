const Product = require("../models/model.product");

exports.createProduct = async (data) => {
  const exists = await Product.findOne({ sku: data.sku });
  if (exists) throw new Error("SKU already exists");

  return await Product.create(data);
};

exports.getProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

exports.updateStock = async (id, qty) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  product.stock = qty;
  await product.save();

  return product;
};

exports.deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  await product.deleteOne();
  return { msg: "Product deleted" };
};
