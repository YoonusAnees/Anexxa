const Sale = require("../models/model.sale");
const Product = require("../models/model.product");

// Create a new sale
exports.createSale = async ({ items, paymentType, cashier }) => {
  let total = 0;

  for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product) throw new Error(`Product not found: ${item.product}`);
    if (product.stock < item.qty)
      throw new Error(`Not enough stock for ${product.name}`);

    item.price = product.price;
    item.subTotal = item.qty * product.price;

    total += item.subTotal;

    // Reduce product stock
    product.stock -= item.qty;
    await product.save();
  }

  // Create sale
  const sale = await Sale.create({
    items,
    paymentType,
    total,
    cashier
  });

  return sale; // will include saleId
};

// Get all sales
exports.getSales = async () => {
  return await Sale.find()
    .populate("cashier", "name email")
    .populate("items.product", "name price")
    .sort({ createdAt: -1 })
    .select("saleId items total paymentType cashier createdAt");
};
