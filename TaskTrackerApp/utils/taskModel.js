const fs = require("fs-extra");
const path = require("path");

const dbPath = path.join(__dirname, "..", "tasks.json");

async function getTasks() {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data).tasks;
}

async function saveTasks(tasks) {
  await fs.writeFile(dbPath, JSON.stringify({ tasks }, null, 2));
}

module.exports = { getTasks, saveTasks };
