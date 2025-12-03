import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

dotenv.config();
const app = express();

app.use(express.json());


app.use("/auth", authRoutes);


app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You accessed a protected route!", user: req.user });
});


app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${process.env.PORT}`);
});
