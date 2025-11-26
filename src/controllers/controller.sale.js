const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET);
const { createSale, getSales } = require("../services/service.sale");

// Create new sale
exports.newSale = async (req, res) => {
  try {
    const cashier = req.user?.id;
    if (!cashier) return res.status(401).json({ msg: "Unauthorized" });

    const { items, paymentType } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ msg: "Cart empty" });

    // CASH → save immediately
    if (paymentType === "cash") {
      const sale = await createSale({ items, cashier, paymentType });
      return res.json(sale);
    }

    // CARD → create pending sale first
    if (paymentType === "card") {
      const pendingSale = await createSale({
        items,
        cashier,
        paymentType,
        status: "pending"
      });

      const lineItems = items.map(i => ({
        price_data: {
          currency: "usd",
          product_data: { name: i.name },
          unit_amount: i.price * 100
        },
        quantity: i.qty
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/pos?stripe=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/pos?stripe=failed`,
        metadata: { saleId: pendingSale._id.toString() }
      });

      return res.json({ url: session.url });
    }

    return res.status(400).json({ msg: "Invalid payment type" });
  } catch (err) {
    console.error("Sale creation error:", err);
    return res.status(400).json({ msg: err.message });
  }
};

// Verify Stripe payment
exports.verifyStripePayment = async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") 
      return res.status(400).json({ msg: "Payment not completed" });

    const sale = await Sale.findById(session.metadata.saleId);
    if (!sale) return res.status(404).json({ msg: "Sale not found" });

    sale.status = "paid";
    sale.stripePaymentId = session.payment_intent;
    await sale.save();

    return res.json(sale);
  } catch (err) {
    console.error("Stripe verify error:", err);
    return res.status(400).json({ msg: err.message });
  }
};

// Get all sales
exports.allSales = async (req, res) => {
  try {
    const sales = await getSales();
    return res.json(sales);
  } catch (err) {
    console.error("Fetch sales error:", err);
    return res.status(400).json({ msg: err.message });
  }
};
