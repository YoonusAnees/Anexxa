const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  qty: Number,
  price: Number,
  subTotal: Number
});

const saleSchema = new mongoose.Schema({
  items: [saleItemSchema],
  total: Number,
  paymentType: { type: String, enum: ["cash", "card"] },
  cashier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sale", saleSchema);
