const jwt = require('jsonwebtoken');

//this authentication step will fail if jwt token is over 20 minutes old since login

//verify request has JWT auth otken in header, and that token matches expected identity
module.exports = function(req, res, next) {
    const jwtToken = req.header('auth-token');
    if(!jwtToken) {
        res.status(403).send('auth-token header required');
        return;
    }
    try{
        const verified = jwt.verify(jwtToken, process.env.JWT_SECRET);
        next();
    }
    catch(err){
        res.status(403).send('invalid JWT token')
        return;
    }
}