const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token. Access denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach userId to every request
    next();             // go to the next step
  } catch {
    res.status(401).json({ message: 'Invalid token.' });
  }
};