import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import githubAuthRoutes from "./routes/githubAuth.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.use("/auth/github", githubAuthRoutes);


app.get("/", (req, res) => {
  res.send("GitHub OAuth Login with JWT");
});

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${process.env.PORT}`);
});
