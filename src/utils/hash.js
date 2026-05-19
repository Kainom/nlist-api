const bcrypt = require("bcryptjs");

exports.hashPassword = (pwd) => bcrypt.hash(pwd, 10);
exports.comparePassword = (pwd, hash) => bcrypt.compare(pwd, hash);