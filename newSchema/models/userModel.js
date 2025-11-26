const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
  },
  age:   { type: Number, min: 1 },
  addresses: [addressSchema]
});

module.exports = mongoose.model("User", userSchema);
