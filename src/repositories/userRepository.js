// src/repositories/userRepository.js
const dbPromise = require("../config/database");

async function col() {
  const client = await dbPromise;
  return client.db().collection("users");
}

exports.findByEmail = async (email) => {
  return (await col()).findOne({ email });
};

exports.create = async (user) => {
  return (await col()).insertOne(user);
};