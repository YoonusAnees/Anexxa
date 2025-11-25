const { createSale, getSales } = require("../services/service.sale");

exports.addSale = async (req, res) => {
  try {
    const sale = await createSale({
      items: req.body.items,
      paymentType: req.body.paymentType,
      cashier: req.user.id
    });

    res.json(sale);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.listSales = async (req, res) => {
  const data = await getSales();
  res.json(data);
};
