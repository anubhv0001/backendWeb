const express = require("express");
const app = express();

const employeeRoutes = require("./routes/employeeRoutes");
const loggerMiddleware = require("./middlewares/loggerMiddleware");

// middlewares
app.use(express.json());
app.use(loggerMiddleware);

// routes
app.use("/employees", employeeRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
