const jwt = require("jsonwebtoken");

// Middleware to check JWT authentication
function auth(req, res, next) {
  // Expecting token in header as: Authorization: Bearer <token>
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token using the secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = auth;
