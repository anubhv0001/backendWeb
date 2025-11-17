const express = require("express");
const app = express();

const getFileInfo = require("./fileInfo");
const parseUrl = require("./urlparser");

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});
app.get("/fileinfo", (req, res) => {
  const filePath = req.query.filepath;

  if (!filePath) {
    return res.send({ error: "Please provide filepath query parameter" });
  }

  const info = getFileInfo(filePath);
  res.send(info);
});

app.get("/parseurl", (req, res) => {
  const fullUrl = req.query.url;

  if (!fullUrl) {
    return res.send({ error: "Please provide url query parameter" });
  }

  const result = parseUrl(fullUrl);
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
