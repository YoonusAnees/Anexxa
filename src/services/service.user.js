const User = require("../models/model.user");
const bcrypt = require("bcryptjs");

exports.createUser = async (data) => {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new Error("User already exists");

  const hash = await bcrypt.hash(data.passwordHash, 10);

  return await User.create({
    name: data.name,
    email: data.email,
    passwordHash: hash,
    role: data.role || "cashier",
  });
};

exports.getUsers = async () => {
  return await User.find().select("-passwordHash").sort({ createdAt: -1 });
};

exports.updateUser = async (id, updates) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  if (updates.name) user.name = updates.name;
  if (updates.role) user.role = updates.role;
  if (updates.status) user.status = updates.status;

  await user.save();
  return user;
};

exports.changePassword = async (id, newPassword) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { msg: "Password updated" };
};

exports.deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");

  user.status = "inactive";
  await user.save();

  return { msg: "User deactivated" };
};
