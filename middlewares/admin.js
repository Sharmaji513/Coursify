const jwt = require("jsonwebtoken")

const ADMIN_SECRET_KEY = process.env.JWT_ADMIN_PASSWORD ;


function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decodeed = jwt.verify(token ,  ADMIN_SECRET_KEY)


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
    adminMiddleware: adminMiddleware
}