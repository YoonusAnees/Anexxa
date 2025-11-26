const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");

const {
  addProduct,
  allProducts,
  editStock,
  removeProduct
} = require("../controllers/controller.product");

router.post("/", auth, allowRoles("admin"), addProduct);
router.put("/:id/stock", auth, allowRoles("admin"), editStock);
router.delete("/:id", auth, allowRoles("admin"), removeProduct);

// Admin + Cashier
router.get("/", auth, allowRoles("admin", "cashier"), allProducts);

module.exports = router;
