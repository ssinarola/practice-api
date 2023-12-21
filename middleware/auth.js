const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// verfiy token for private pages/apis
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return next(
        createError(401, { message: "Token is required for Authentication !" })
      );
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.decodedUser = decoded;
    return next();
  } catch (err) {
    next(createError(400, { message: err.message }));
  }
};

module.exports = verifyToken;
