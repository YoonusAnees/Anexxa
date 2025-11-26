const { registerUser, loginUser } = require("../services/service.auth");

exports.register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
