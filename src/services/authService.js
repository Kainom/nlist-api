const userRepo = require("../repositories/userRepository");
const { createUser } = require("../models/userModel");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

exports.register = async (email, password) => {
    const exists = await userRepo.findByEmail(email);
    if (exists) throw new Error("USER_EXISTS");

    const hashed = await hashPassword(password);
    const user = createUser({ email, password: hashed });

    await userRepo.create(user);

    return { message: "created" };
};

exports.login = async (email, password) => {
    const user = await userRepo.findByEmail(email);
    console.log(user)
    if (!user) throw new Error("INVALID_CREDENTIALS");

    const valid = await comparePassword(password, user.password);
    if (!valid) throw new Error("INVALID_CREDENTIALS");

    const token = generateToken({
        userId: user._id.toString(),
        role: user.role, // 🔥 importante
    });
    return { token };
};