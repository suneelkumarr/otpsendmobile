const User = require("../model/user.model");
const { AUTH_TOKEN_MISSING_ERR, AUTH_HEADER_MISSING_ERR, JWT_DECODE_ERR, USER_NOT_FOUND_ERR } = require("../Error/error")
const { verifyJwtToken } = require("../utils/token.utils")

module.exports = async (req,res, next) =>{
    try{
        const header=  req.headers.authorization
        if(!header){
            next({status:403, message:AUTH_HEADER_MISSING_ERR})
            return
        }

        // verify auth token

        const token = header.split("Bearer ")[1]

        if(!token){
            next({ status: 403, message: AUTH_TOKEN_MISSING_ERR })
            return
        }

        const userId = verifyJwtToken(token,next)

        if (!userId) {
            next({ status: 403, message: JWT_DECODE_ERR })
            return
        }

        const user = await User.findById(userId)

        if (!user) {
            next({status: 404, message: USER_NOT_FOUND_ERR })
            return
        }

        res.locals.user = user

        next()
    }catch(err){
        next(err)
    }
} 