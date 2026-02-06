const jwt = require("jsonwebtoken");

module.exports = (req) => {
  const header = req.headers.authorization;
  if (!header) return null;

  const token = header.split(" ")[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { id: decoded.userId };
  } catch {
    return null;
  }
};
