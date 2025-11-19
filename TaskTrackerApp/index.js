const express = require("express");
const app = express();

const { getTasks, saveTasks } = require("utils/taskModel");

app.use(express.json());

app.get("/tasks", async (req, res) => {
  const tasks = await getTasks();
  res.json(tasks);
});


app.get("/tasks/filter", async (req, res) => {
  const { tag } = req.query;
  const tasks = await getTasks();

  if (!tag) {
    return res.status(400).json({ error: "Tag query parameter is required" });
  }

  const filtered = tasks.filter(task => task.tag === tag);
  res.json(filtered);
});


app.post("/tasks", async (req, res) => {
  const { title, description, tag, priority, status } = req.body;

  if (!title || !description || !tag || !priority || !status) {
    return res.status(400).json({
      error: "Please provide title, description, tag, priority, and status",
    });
  }

  const tasks = await getTasks();
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    tag,
    priority,
    status,
  };

  tasks.push(newTask);
  await saveTasks(tasks);

  res.status(201).json(newTask);
});


app.put("/tasks/:id", async (req, res) => {
  const tasks = await getTasks();
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, description, tag, priority, status } = req.body;

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.tag = tag ?? task.tag;
  task.priority = priority ?? task.priority;
  task.status = status ?? task.status;

  await saveTasks(tasks);
  res.json(task);
});


app.delete("/tasks/:id", async (req, res) => {
  let tasks = await getTasks();
  const exists = tasks.some(t => t.id == req.params.id);

  if (!exists) return res.status(404).json({ error: "Task not found" });

  tasks = tasks.filter(t => t.id != req.params.id);
  await saveTasks(tasks);

  res.json({ message: "Task deleted" });
});


app.use("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Task Tracker running on port ${PORT}`));
