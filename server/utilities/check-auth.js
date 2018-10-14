var config = require('../config/config');
var jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // add this if the token has a "Bearer" in the beginning
        const decoded = jwt.verify(token, config.secret);
        console.log(decoded);
        req.userDarta = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Authentication Failed!'
        })
    }
};