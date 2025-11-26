const User = require("../models/user.model");


exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.addresses.push(req.body);
    await user.save();

    res.json({ message: "Address added", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const users = await User.find();

    const totalUsers = users.length;
    const totalAddresses = users.reduce((sum, u) => sum + u.addresses.length, 0);

    const userSummary = users.map(u => ({
      name: u.name,
      addressCount: u.addresses.length
    }));

    res.json({ totalUsers, totalAddresses, userSummary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.json({ message: "Address removed", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
