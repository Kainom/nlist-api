const { verifyToken } = require("../utils/jwt");

module.exports = (req) => {
  const auth = req.headers.authorization;
  if (!auth) throw new Error("NO_TOKEN");

  const token = auth.split(" ")[1];
  return verifyToken(token);
};