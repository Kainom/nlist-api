
function createUser({ email, password, role = "user" }) {
  if (!email || !password) {
    throw new Error("INVALID_USER_DATA");
  }

  return {
    email: email.toLowerCase().trim(),
    password,
    role, // 🔥 importante
    createdAt: new Date(),
  };
}

module.exports = { createUser };

function toPublic(user) {
  return {
    id: user._id?.toString(),
    email: user.email,
    createdAt: user.createdAt,
  };
}

module.exports = { createUser, toPublic };