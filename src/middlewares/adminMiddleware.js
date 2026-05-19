
module.exports = (user) => {
  if (user.role !== "admin") {
    throw new Error("FORBIDDEN");
  }
};