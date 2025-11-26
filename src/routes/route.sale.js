const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");
const { newSale, allSales, verifyStripePayment } = require("../controllers/controller.sale");

router.post("/", auth, allowRoles("admin","cashier"), newSale);
router.get("/verify", auth, verifyStripePayment);
router.get("/", auth, allowRoles("admin","cashier"), allSales);

module.exports = router;
