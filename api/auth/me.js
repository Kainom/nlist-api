const auth = require("../../src/middlewares/authMiddleware");
const applyCors = require("../../src/utils/cors");

module.exports = async (req, res) => {

  if (applyCors(req, res)) return; // 🔥 preflight


  try {
    const user = auth(req);
    res.status(200).json(user);
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};