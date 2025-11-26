const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/user.routes");
const profileRoutes = require("./routes/profile.routes");

const app = express();
app.use(express.json());

connectDB();

app.use("/", userRoutes);
app.use("/", profileRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
