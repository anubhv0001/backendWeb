const express = require("express");
const Redis = require("ioredis");
const { getItems, addItem, updateItem, deleteItem } = require("./db");

const app = express();
app.use(express.json());


const redis = new Redis(); 

const CACHE_KEY = "items:all"; 


app.get("/items", async (req, res) => {
  try {
    const cachedData = await redis.get(CACHE_KEY);

    if (cachedData) {
      console.log("🚀 Cache Hit!");
      return res.json(JSON.parse(cachedData));
    }

    console.log("❗ Cache Miss! Fetching from DB...");
    const items = getItems();

    await redis.set(CACHE_KEY, JSON.stringify(items), "EX", 60); 

    return res.json(items);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/items", async (req, res) => {
  try {
    const newItem = {
      id: Date.now(),
      name: req.body.name
    };

    addItem(newItem);

   
    await redis.del(CACHE_KEY);
    console.log("🗑️ Cache invalidated after ADD");

    res.json({ message: "Item added", item: newItem });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.put("/items/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    updateItem(id, req.body);

    await redis.del(CACHE_KEY);
    console.log("🗑️ Cache invalidated after UPDATE");

    res.json({ message: "Item updated" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.delete("/items/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    deleteItem(id);

    await redis.del(CACHE_KEY);
    console.log("🗑️ Cache invalidated after DELETE");

    res.json({ message: "Item deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(3000, () => console.log("Server running on port 3000"));
