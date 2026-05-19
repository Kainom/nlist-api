const service = require("../../src/services/animeService");
const auth = require("../../src/middlewares/authMiddleware");
const applyCors = require("../../src/utils/cors");

module.exports = async (req, res) => {
  if (applyCors(req, res)) return; 

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {

    const user = auth(req);

    const { q } = req.query;

    const result = await service.search(
      user.userId,
      q
    );

    res.status(200).json(result);

  } catch (e) {

    res.status(400).json({
      error: e.message
    });

  }

}
