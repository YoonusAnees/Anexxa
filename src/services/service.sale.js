const Sale = require("../models/model.sale");
const Product = require("../models/model.product");

exports.createSale = async ({ items, paymentType, cashier }) => {
  let total = 0;

  for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product) throw new Error("Product not found");
    if (product.stock < item.qty)
      throw new Error(`Not enough stock for ${product.name}`);

    item.price = product.price;
    item.subTotal = item.qty * product.price;

    total += item.subTotal;

    product.stock -= item.qty;
    await product.save();
  }

  const sale = await Sale.create({
    items,
    paymentType,
    total,
    cashier
  });

  return sale;
};

exports.getSales = async () => {
  return await Sale.find()
    .populate("cashier", "name email")
    .populate("items.product", "name price")
    .sort({ createdAt: -1 });
};
