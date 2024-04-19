const jwt = require("jsonwebtoken");


 const tokenGenerate = (id, secret, time) => {
    return jwt.sign({id}, secret, {expiresIn: time})
 }

 exports.tokenGenerate = tokenGenerate;