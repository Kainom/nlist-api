const userRepo = require("../repositories/userRepository");
const { createUser } = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

const normalizeEmail = (email) => String(email || "").toLowerCase().trim();

exports.register = async (email, password) => {
    const exists = await userRepo.findByEmail(normalizeEmail(email));
    if (exists) throw new Error("USER_EXISTS");

    const hashed = await hashPassword(password);
    const user = createUser({ email, password: hashed });

    await userRepo.create(user);

    return { message: "created" };
};

exports.login = async (email, password) => {
    if (!email || !password) throw new Error("INVALID_CREDENTIALS");

    // e-mails são gravados em minúsculo (userModel.createUser),
    // então a busca precisa normalizar do mesmo jeito
    const user = await userRepo.findByEmail(normalizeEmail(email));
    if (!user) throw new Error("INVALID_CREDENTIALS");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("INVALID_CREDENTIALS");

    const token = generateToken({
        userId: user._id.toString(),
        role: user.role, // 🔥 importante
    });
    return { token };
};