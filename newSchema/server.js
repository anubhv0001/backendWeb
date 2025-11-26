const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/user_address_system")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/users", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
