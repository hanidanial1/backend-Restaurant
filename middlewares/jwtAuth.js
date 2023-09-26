const jwt = require("jsonwebtoken");

const jwtAuth = async (req, res, next) => {
  console.log();
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.client = decoded;
  next();
};

module.exports = jwtAuth;
