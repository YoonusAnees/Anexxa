const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  qty: Number,
  price: Number,
  subTotal: Number
});

const saleSchema = new mongoose.Schema({
  saleId: { type: String, unique: true }, // Custom ID like S001
  items: [saleItemSchema],
  total: Number,
  paymentType: { type: String, enum: ["cash", "card"] },
  cashier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

// Pre-save hook to generate saleId (async style)
saleSchema.pre("save", async function () {
  if (!this.saleId) {
    const lastSale = await this.constructor.findOne().sort({ createdAt: -1 });
    let lastIdNumber = 0;
    if (lastSale && lastSale.saleId) {
      lastIdNumber = parseInt(lastSale.saleId.replace("S", "")) || 0;
    }
    this.saleId = `S${String(lastIdNumber + 1).padStart(3, "0")}`;
  }
  // no next() call needed in async function
});

module.exports = mongoose.model("Sale", saleSchema);
