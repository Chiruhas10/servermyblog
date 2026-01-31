const jwt = require('jsonwebtoken');

const loginMiddleware = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, "JSONString");
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = loginMiddleware;
