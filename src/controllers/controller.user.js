const {
  createUser,
  getUsers,
  updateUser,
  changePassword,
  deleteUser
} = require("../services/service.user");

exports.addUser = async (req, res) => {
  try {
    const u = await createUser(req.body);
    res.json(u);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const list = await getUsers();
    res.json(list);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const result = await changePassword(req.params.id, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.disableUser = async (req, res) => {
  try {
    const out = await deleteUser(req.params.id);
    res.json(out);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
