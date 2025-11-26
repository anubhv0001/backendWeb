const User = require("../models/User.model");

exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const newUser = new User({ name, email });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};
