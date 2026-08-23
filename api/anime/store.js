const service = require("../../src/services/animeService");
const auth = require("../../src/middlewares/authMiddleware");
const applyCors = require("../../src/utils/cors");
const sendError = require("../../src/utils/sendError");

module.exports = async (req, res) => {
  if (applyCors(req, res)) return; // 🔥 preflight

  if (req.method !== "POST") return res.status(405).end();

  try {
    const user = auth(req);

    const result = await service.create({
      ...req.body,
      userId: user.userId,
    });

    res.status(201).json(result);
  } catch (e) {
    sendError(res, e);
  }
};