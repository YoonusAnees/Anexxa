const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addProduct,
  listProducts,
  editProduct,
  removeProduct
} = require("../controllers/controller.product");

router.get("/", auth, listProducts);
router.post("/", auth, addProduct);
router.put("/:id", auth, editProduct);
router.delete("/:id", auth, removeProduct);

module.exports = router;
