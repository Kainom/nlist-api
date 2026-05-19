// src/utils/jwt.js
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET not set");
}

exports.generateToken = (payload) =>
  jwt.sign(payload, SECRET, { expiresIn: "7d" });

exports.verifyToken = (token) =>
  jwt.verify(token, SECRET);