const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI not set");
}

let client;
let promise;

if (!global._mongo) {
  client = new MongoClient(uri);
  global._mongo = client.connect();
}

promise = global._mongo;

module.exports = promise;