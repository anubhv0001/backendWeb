const mongoose = require("./db");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: "pending" },
  dueDate: { type: Date }
}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
