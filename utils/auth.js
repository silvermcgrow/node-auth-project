const jwt = require('jsonwebtoken');

const validateToken = (req, res, next)=>{
    if(!req.headers['authorization']){
        return res.status(403).json({message: 'Token is required'})
    }
    try {
        const decode = jwt.verify(req.headers['authorization'], process.env.SECRET);
        return next();
    } catch (err) {
        return res.status(403)
                .json({message: "Token is not valid or it's expired"});
    }
}

module.exports = {
    validateToken
}