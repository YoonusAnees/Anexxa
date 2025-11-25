const Product = require("../models/model.product");

exports.createProduct = async (data) => {
  return await Product.create(data);
};

exports.getProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

exports.updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
