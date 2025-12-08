

const { v4: uuidv4 } = require("uuid");

const users = {}; 
const usersByEmail = {}; 
const passwordResetTokens = {}; 

function createUser({ name, email, passwordHash }) {
  const id = uuidv4();
  users[id] = { id, name, email, passwordHash, createdAt: Date.now() };
  usersByEmail[email.toLowerCase()] = id;
  return users[id];
}

function getUserByEmail(email) {
  const id = usersByEmail[email.toLowerCase()];
  return id ? users[id] : null;
}

function getUserById(id) {
  return users[id] || null;
}

function setPasswordResetToken(token, userId, expiresAt) {
  passwordResetTokens[token] = { userId, expiresAt };
}

function getResetEntry(token) {
  return passwordResetTokens[token] || null;
}

function deleteResetEntry(token) {
  delete passwordResetTokens[token];
}

function updateUserPassword(userId, newPasswordHash) {
  if (!users[userId]) return false;
  users[userId].passwordHash = newPasswordHash;
  return true;
}

function emailExists(email) {
  return !!usersByEmail[email.toLowerCase()];
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  setPasswordResetToken,
  getResetEntry,
  deleteResetEntry,
  updateUserPassword,
  emailExists
};
