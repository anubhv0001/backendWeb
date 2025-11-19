const fs = require("fs-extra");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db.json");

async function getTickets() {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data).tickets;
}

async function saveTickets(tickets) {
  await fs.writeFile(dbPath, JSON.stringify({ tickets }, null, 2));
}

module.exports = {
  getTickets,
  saveTickets,
};
