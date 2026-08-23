const service = require("../../src/services/authService");
const applyCors = require("../../src/utils/cors");
const sendError = require("../../src/utils/sendError");

module.exports = async (req, res) => {
  if (applyCors(req, res)) return; // 🔥 preflight

  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email, password } = req.body || {};
    const result = await service.login(email, password);
    res.status(200).json(result);
  } catch (e) {
    // antes: todo erro virava 401 INVALID_CREDENTIALS,
    // então falha de banco parecia "senha errada"
    sendError(res, e);
  }
};
