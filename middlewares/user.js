const jwt = require("jsonwebtoken")

const USER_SECRET_KEY = process.env.JWT_USER_PASSWORD ;


function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decodeed = jwt.verify(token , USER_SECRET_KEY)


    if(decodeed){
        req.userId = decodeed.id;
        next()
    }else{
        res.status(403).json({
            message:"your are not signed in"
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}