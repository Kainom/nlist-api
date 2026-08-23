const { verifyToken } = require("../utils/jwt");

module.exports = (req) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) throw new Error("NO_TOKEN");

  try {
    return verifyToken(token);
  } catch (e) {
    throw new Error(
      e.name === "TokenExpiredError" ? "TOKEN_EXPIRED" : "INVALID_TOKEN"
    );
  }
};
