const jwt = require('jsonwebtoken');

//this authentication step will fail if jwt token is over 20 minutes old since login

//verify request has JWT auth otken in header, and that token matches expected identity
module.exports = function(req, res, next) {
    //let jwtToken = req.header('auth-token');
    //if(!jwtToken) {
        //workaround for front end issues...
        //res.status(403).send('auth-token header required');
        //return;
        jwtToken = req.body('auth-token')
        try{
            const verified = jwt.verify(jwtToken, process.env.JWT_SECRET);
            next();
        }
        catch(err){
            res.status(403).send('invalid JWT token')
            return;
        }

    //}
    try{
        const verified = jwt.verify(jwtToken, process.env.JWT_SECRET);
        next();
    }
    catch(err){
        res.status(403).send('invalid JWT token')
        return;
    }
}
