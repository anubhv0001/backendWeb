const Task = require("./Task");


async function createTask(taskData) {
  const task = new Task(taskData);
  await task.save();
  console.log("✅ Task Created:", task);
}


async function getAllTasks() {
  const tasks = await Task.find();
  console.log("📌 All Tasks:", tasks);
}

async function getTasksByStatus(status) {
  const tasks = await Task.find({ status });
  console.log(`📌 Tasks with status '${status}':`, tasks);
}

async function getTasksByDueDate(date) {
  const tasks = await Task.find({ dueDate: { $lte: date } });
  console.log(`📌 Tasks due before ${date}:`, tasks);
}


async function updateTask(id, updatedData) {
  const task = await Task.findByIdAndUpdate(id, updatedData, { new: true });
  console.log("🔄 Task Updated:", task);
}
async function deleteTask(id) {
  await Task.findByIdAndDelete(id);
  console.log(`🗑️ Task Deleted (ID: ${id})`);
}

module.exports = {
  createTask,
  getAllTasks,
  getTasksByStatus,
  getTasksByDueDate,
  updateTask,
  deleteTask
};
