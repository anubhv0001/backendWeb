const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const readDB = () => {
  const data = fs.readFileSync("./db.json", "utf8");
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
};


app.post("/dishes", (req, res) => {
  const db = readDB();

  const newDish = {
    id: Date.now(), 
    ...req.body,
  };

  db.dishes.push(newDish);
  writeDB(db);

  res.status(201).json(newDish);
});


app.get("/dishes", (req, res) => {
  const db = readDB();
  res.json(db.dishes);
});


app.get("/dishes/:id", (req, res) => {
  const db = readDB();
  const dish = db.dishes.find((d) => d.id == req.params.id);

  if (!dish) {
    return res.status(404).json({ message: "Dish not found" });
  }

  res.json(dish);
});


app.put("/dishes/:id", (req, res) => {
  const db = readDB();
  const index = db.dishes.findIndex((d) => d.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Dish not found" });
  }

  db.dishes[index] = { ...db.dishes[index], ...req.body };
  writeDB(db);

  res.json(db.dishes[index]);
});


app.delete("/dishes/:id", (req, res) => {
  const db = readDB();
  const index = db.dishes.findIndex((d) => d.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Dish not found" });
  }

  const deletedDish = db.dishes.splice(index, 1);
  writeDB(db);

  res.json(deletedDish[0]);
});
app.get("/dishes/get", (req, res) => {
  const { name } = req.query;

  if (!name) return res.status(400).json({ message: "Name query required" });

  const db = readDB();

  const results = db.dishes.filter((dish) =>
    dish.name.toLowerCase().includes(name.toLowerCase())
  );

  if (results.length === 0) {
    return res.json({ message: "No dishes found" });
  }

  res.json(results);
});

// 404 Handler for undefined routes
// -----------------------------
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

// Start serer
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
