const argon2 = require("argon2")
const userModel = require("../src/model").users

async function hashPassword(password) {
    return await argon2.hash(password);
}

async function verifyPassword(plainPassword, hashedPassword) {
    return await argon2.verify(hashPassword, plainPassword)
}


async function validateUser(email, password) {
    user = await userModel.findOne({ where :{ email: email }})
    if (!user) {
        return false
    }

    const verifyPassword = await argon2.verify(user.password, password)
    if (!verifyPassword) {
        return false
    }
    return user;
}

module.exports = {
    hashPassword,
    verifyPassword,
    validateUser
}