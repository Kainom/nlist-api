// scripts/seedAnimes.js

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const clientPromise = require("../src/config/database.js");

const USER_ID = process.env.USER_ID;

const USER_ID = "6a0b1db27b53df75cf12a272";

(async () => {
  try {
    const client = await clientPromise;
    const db = client.db();

    const filePath = path.join(__dirname, "../anime-completo.json");
    const raw = fs.readFileSync(filePath, "utf-8");

    const animes = JSON.parse(raw);

    const collection = db.collection("animes");

    const docs = animes.map((anime) => ({
      title: anime.title,
      imageUrl: anime.image,
      description: "", 
      rating: anime.score ?? null,
      episodes: anime.episodes ?? 0,
      status: "completed",
      userId: USER_ID,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    if (!docs.length) {
      console.log("Nenhum anime encontrado");
      process.exit(0);
    }

    await collection.deleteMany({ userId: USER_ID });

    await collection.insertMany(docs);

    console.log(`✅ ${docs.length} animes inseridos com sucesso`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro:", err);
    process.exit(1);
  }
})();