// Traduz erros de domínio em status HTTP.
// Qualquer erro não mapeado é falha do servidor (500) — nunca 401,
// para o front não confundir bug de backend com sessão expirada.
const STATUS = {
  NO_TOKEN: 401,
  INVALID_TOKEN: 401,
  TOKEN_EXPIRED: 401,
  INVALID_CREDENTIALS: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  USER_EXISTS: 409,
  INVALID_USER_DATA: 400,
  TITLE_REQUIRED: 400,
  INVALID_RATING: 400,
  INVALID_STATUS: 400,
  INVALID_ID: 400,
};

module.exports = function sendError(res, e) {
  const status = STATUS[e.message];

  if (status) {
    return res.status(status).json({ error: e.message });
  }

  console.error("[api] erro inesperado:", e);
  return res.status(500).json({ error: "INTERNAL_ERROR" });
};
