import dotenv  from "dotenv"

dotenv.config() 

const port = process.env.PORT
const jwtSecret = process.env.JWTSECRET

export {
    port,
    jwtSecret 
}