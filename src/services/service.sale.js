const Sale = require("../models/model.sale");
const Product = require("../models/model.product");

// Create sale & reduce stock
exports.createSale = async ({ items, cashier, paymentType, stripePaymentId, status }) => {
  const detailedItems = await Promise.all(
    items.map(async (i) => {
      const product = await Product.findById(i.product);
      if (!product) throw new Error(`${i.name} not found`);
      if (product.stock < i.qty) throw new Error(`${product.name} out of stock`);

      // Reduce stock **only for paid or pending card sale**
      if (status === "paid" || paymentType === "card") {
        product.stock -= i.qty;
        await product.save();
      }

      return {
        product: product._id,
        name: product.name,
        qty: i.qty,
        price: product.price,
        subTotal: product.price * i.qty
      };
    })
  );

  const total = detailedItems.reduce((sum, x) => sum + x.subTotal, 0);

  const sale = await Sale.create({
    items: detailedItems,
    total,
    paymentType,
    status: status || "paid",
    cashier,
    stripePaymentId
  });

  return sale;
};

exports.getSales = async () => {
  return await Sale.find().populate("cashier", "name");
};
