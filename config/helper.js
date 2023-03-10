import argon2 from "argon2"
import {db} from "../src/model/index.js"

const UserModel = db.users;

const hashPassword = async (password) => {
    return await argon2.hash(password);
}

const verifyPassword = async (plainPassword, hashedPassword) => {
    return await argon2.verify(hashPassword, plainPassword)
}


const validateUser = async (email, password) => {
    const user = await UserModel.findOne({ where :{ email: email }})

    if (!user) {
        return false
    }

    const verifyPassword = await argon2.verify(user.password, password)
    if (!verifyPassword) {
        return false
    }
    return user;
}

export {
    hashPassword,
    verifyPassword,
    validateUser
}