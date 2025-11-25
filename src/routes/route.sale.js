const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");

const { newSale, allSales } = require("../controllers/controller.sale");

// Cashier creates sale
router.post("/", auth, allowRoles("admin","cashier"), newSale);

// Admin view all sales
router.get("/", auth, allowRoles("admin","cashier"), allSales);

module.exports = router;
