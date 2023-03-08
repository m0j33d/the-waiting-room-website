require('dotenv').config();

module.exports = {
    'port': process.env.PORT,
    'jwtSecret': process.env.JWTSECRET
}