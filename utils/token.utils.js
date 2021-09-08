const jwt = require("jsonwebtoken");
// const {JWT_DECODE_ERR} = require('../Error/error');
const {JWT_SECRET} = require("../config/config");

exports.createJwtToken = (payload) =>{
    const token = jwt.sign(payload,JWT_SECRET,{expiresIn:"12h"});
    return token;
};

exports.verifyJwtToken =(token, next)=>{
    try{
        const{userId} = jwt.verify(token, JWT_SECRET);
        return userId;
    }catch(err){
        next(err);
    }
}