const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");

const {
  addUser,
  listUsers,
  editUser,
  updatePassword,
  disableUser
} = require("../controllers/controller.user");

// Admin Only Routes
router.post("/", auth, allowRoles("admin"), addUser);               // Create cashier/admin
router.get("/", auth, allowRoles("admin"), listUsers);             // List all users
router.put("/:id", auth, allowRoles("admin"), editUser);           // Update user
router.put("/:id/password", auth, allowRoles("admin"), updatePassword); // Change password
router.delete("/:id", auth, allowRoles("admin"), disableUser);     // Deactivate user

module.exports = router;
