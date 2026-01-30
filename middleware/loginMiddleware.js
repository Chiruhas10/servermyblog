const jwt = require('jsonwebtoken');
const loginMiddleware = (req, res, next)=>{
    const token = req.header('x-token');
    if(!token){
        res.send("<h1>No Token found </h1>");
    }
    const decode = jwt.verify(token, "JSONString123");
    req.user = decode.user;
    next();
}

module.exports = loginMiddleware;