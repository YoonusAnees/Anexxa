const { createSale, getSales } = require("../services/service.sale");

// Create a new sale
exports.newSale = async (req, res) => {
  try {
    const cashier = req.user?.id;
    if (!cashier) return res.status(401).json({ msg: "Unauthorized" });

    const { items, paymentType } = req.body;

    // Basic validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ msg: "Cart items required" });
    }

    if (!["cash", "card"].includes(paymentType)) {
      return res.status(400).json({ msg: "Invalid payment type" });
    }

    const sale = await createSale({ items, paymentType, cashier });

    // Return sale including the generated saleId
    return res.json(sale);
  } catch (err) {
    console.error("Sale creation error:", err.message);
    return res.status(400).json({ msg: err.message });
  }
};

// Get all sales
exports.allSales = async (req, res) => {
  try {
    const sales = await getSales();
    return res.json(sales);
  } catch (err) {
    console.error("Fetch sales error:", err.message);
    return res.status(400).json({ msg: err.message });
  }
};
