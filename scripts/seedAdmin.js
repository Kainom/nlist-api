// scripts/seedAdmin.js

require("dotenv").config();

const clientPromise = require("../src/config/database.js");
const { hashPassword } = require("../src/utils/hash");

(async () => {
  const client = await clientPromise;
  const db = client.db();

  const email =  process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD;

  const existing = await db.collection("users").findOne({ email });

  if (existing) {
    console.log("Admin já existe");
    process.exit();
  }

  const hashed = await hashPassword(password);

  await db.collection("users").insertOne({
    email,
    password: hashed,
    role: "admin",
    createdAt: new Date(),
  });

  console.log("Admin criado com sucesso");
  process.exit();
})();