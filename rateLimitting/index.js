const express=require('express')
const rateLimit=require("express-rate-limit");
const apiRoutes = require("./routes/api");

const app = express();

app.use(express.json());
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
})


app.use("/api", apiRoutes(limiter));  


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
})

app.listen(3000, () => console.log("Server running on port 3000"));