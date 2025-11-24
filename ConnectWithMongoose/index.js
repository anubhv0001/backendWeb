const {
  createTask,
  getAllTasks,
  getTasksByStatus,
  getTasksByDueDate,
  updateTask,
  deleteTask
} = require("./taskOperations");

async function run() {
  
  await createTask({
    title: "Finish Assignment",
    description: "Do MongoDB and Mongoose task",
    status: "pending",
    dueDate: new Date("2025-12-01")
  });

  await createTask({
    title: "Buy Groceries",
    description: "Vegetables and fruits",
    status: "completed",
    dueDate: new Date("2025-11-30")
  });

  await getAllTasks();
  await getTasksByStatus("pending");
  await getTasksByDueDate(new Date("2025-12-01"));

 
}

run();
