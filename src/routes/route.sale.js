const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { addSale, listSales } = require("../controllers/controller.sale");

router.get("/", auth, listSales);
router.post("/", auth, addSale);

module.exports = router;
