const fs = require("fs-extra");
const path = require("path");

const dbPath = path.join(__dirname, "..", "employees.json");

async function getEmployees() {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data).employees;
}

async function saveEmployees(employees) {
  await fs.writeFile(dbPath, JSON.stringify({ employees }, null, 2));
}

module.exports = { getEmployees, saveEmployees };
