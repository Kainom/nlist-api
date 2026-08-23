const applyCors = require("../../src/utils/cors");
const sendError = require("../../src/utils/sendError");

const service = require("../../src/services/animeService");
const auth = require("../../src/middlewares/authMiddleware");

module.exports = async (req, res) => {
  if (applyCors(req, res)) return; // 🔥 preflight

  if (req.method !== "DELETE") return res.status(405).end();

  try {
    const user = auth(req);
    const { id } = req.query;

    await service.remove(id, user.userId);

    res.status(204).end();
  } catch (e) {
    sendError(res, e);
  }
};