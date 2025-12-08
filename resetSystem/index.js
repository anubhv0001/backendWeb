
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { v4: uuidv4 } = require("uuid");

const db = require("./db");
const { sendMail } = require("./mailer");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "6h";
const RESET_TOKEN_TTL_MINUTES = Number(process.env.RESET_TOKEN_TTL_MINUTES) || 30;


function generateAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}


const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 5,
  message: { message: "Too many password reset attempts from this IP, please try later." }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "name, email, password required" });

    if (db.emailExists(email)) return res.status(400).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = db.createUser({ name, email, passwordHash });

    const token = generateAccessToken(user);
    res.status(201).json({ message: "User created", user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const user = db.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateAccessToken(user);
    res.json({ message: "Logged in", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/forgot-password", forgotPasswordLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "If that email is registered, a reset link will be sent." });

    const user = db.getUserByEmail(email);


    if (user) {

      const token = uuidv4();
      const expiresAt = Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000;
      db.setPasswordResetToken(token, user.id, expiresAt);

    
      const resetLink = `http://localhost:${PORT}/reset-password/${token}`;

    
      const subject = "Password reset request";
      const text = `We received a request to reset your password. Use the link below to reset it.
If you did not request this, you can ignore this email.

Reset link (valid for ${RESET_TOKEN_TTL_MINUTES} minutes):
${resetLink}`;

      const { previewUrl } = await sendMail({
        to: user.email,
        subject,
        text,
        from: process.env.FROM_EMAIL
      });

      console.log(`[ForgotPassword] token=${token} user=${user.email} previewUrl=${previewUrl || "n/a"}`);
      
    }


    res.json({ message: "If that email is registered, a password reset link will be sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "If that email is registered, a password reset link will be sent." });
  }
});



app.post("/reset-password/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: "New password required" });

    const entry = db.getResetEntry(token);
    if (!entry) return res.status(400).json({ error: "Invalid or expired token" });

    if (Date.now() > entry.expiresAt) {
  
      db.deleteResetEntry(token);
      return res.status(400).json({ error: "Invalid or expired token" });
    }

  
    const newHash = await bcrypt.hash(password, 10);
    const updated = db.updateUserPassword(entry.userId, newHash);

    db.deleteResetEntry(token);

    if (!updated) return res.status(500).json({ error: "Could not update password" });

    const user = db.getUserById(entry.userId);
    if (user) {
      const subject = "Your password has been changed";
      const text = `Hello ${user.name || ""},
Your password was recently changed. If you did not perform this action, please contact support immediately.`;

      const { previewUrl } = await sendMail({
        to: user.email,
        subject,
        text,
        from: process.env.FROM_EMAIL
      });
      console.log(`[ResetPassword] user=${user.email} confirmationPreview=${previewUrl || "n/a"}`);
    }

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


function authenticateMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = db.getUserById(payload.id);
    if (!req.user) return res.status(401).json({ error: "Invalid token (user not found)" });
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

app.get("/me", authenticateMiddleware, (req, res) => {
  const { id, name, email, createdAt } = req.user;
  res.json({ id, name, email, createdAt });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Reset token TTL minutes: ${RESET_TOKEN_TTL_MINUTES}`);
  console.log("If no SMTP configured, Ethereal will be used and nodemailer preview URL will be logged.");
});
