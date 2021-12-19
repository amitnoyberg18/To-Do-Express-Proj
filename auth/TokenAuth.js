const jwt = require('jsonwebtoken');
module.exports = function TokenAuth(req,res,next){
    try{
        const token = req.cookies.token
        jwt.verify(token,'secretKey',{});
        next();
    }catch(error){
        res.status(403).json({error:error})
    }
    //get the token from the req 

}