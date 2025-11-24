const mongoose = require("mongoose");


const MONGO_URL = "mongodb://127.0.0.1:27017/TaskDB";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB (TaskDB)"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

module.exports = mongoose;
