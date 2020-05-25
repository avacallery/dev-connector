const jwt = require('jsonwebtoken');
const config = require('config');

//middleware has access to req and res objects
//next is the callback we have to run so it moves on to next middleware
module.exports = function (req, res, next) {
  //get token from header
  const token = req.header('x-auth-token');

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtToken'));
    //set decoded user to the body of the req (user)
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
