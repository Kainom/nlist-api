const service = require("../../src/services/authService");
const auth = require("../../src/middlewares/authMiddleware");
const adminOnly = require("../../src/middlewares/adminMiddleware");
const applyCors = require("../../src/utils/cors");
const sendError = require("../../src/utils/sendError");

module.exports = async (req, res) => {
  if (applyCors(req, res)) return;

  if (req.method !== "POST") return res.status(405).end();

  try {
    const user = auth(req);        // precisa estar logado
    adminOnly(user);               // precisa ser admin

    const { email, password } = req.body || {};

    const result = await service.register(email, password);

    res.status(201).json(result);
  } catch (e) {
    sendError(res, e);
  }
};
