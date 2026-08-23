const auth = require("../../src/middlewares/authMiddleware");
const applyCors = require("../../src/utils/cors");
const sendError = require("../../src/utils/sendError");

module.exports = async (req, res) => {
  if (applyCors(req, res)) return; // 🔥 preflight

  try {
    const user = auth(req);
    res.status(200).json(user);
  } catch (e) {
    sendError(res, e);
  }
};
