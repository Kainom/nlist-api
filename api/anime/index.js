
const service = require("../../src/services/animeService");
const auth = require("../../src/middlewares/authMiddleware");
const applyCors = require("../../src/utils/cors");

module.exports = async (req, res) => {
  if (applyCors(req, res)) return; // 🔥 preflight

  if (req.method !== "GET") return res.status(405).end();

  try {
    const user = auth(req);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await service.getAll(user.userId, { page, limit });

    res.status(200).json(result);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};