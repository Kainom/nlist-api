const service = require("../../src/services/authService");
const applyCors = require("../../src/utils/cors");

module.exports = async (req, res) => {
    if (applyCors(req, res)) return; // 🔥 preflight
  
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email, password } = req.body;
    const result = await service.login(email, password);
    res.status(200).json(result);
  } catch {
    res.status(401).json({ error: "INVALID_CREDENTIALS" });
  }
};