import express from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

const router = express.Router();


router.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      { headers: { Accept: "application/json" } }
    );

    const access_token = tokenRes.data.access_token;

    const userRes = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const { id, login, email } = userRes.data;

   
    let user = await User.findOne({ githubId: id });

    if (!user) {
      user = new User({
        githubId: id,
        username: login,
        email: email || "no-email-provided"
      });

      await user.save();
    }

  
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

   
    res.json({
      message: "GitHub Login Successful",
      token: token
    });

  } catch (err) {
    res.status(500).json({ message: "GitHub OAuth Failed", error: err.message });
  }
});

export default router;
