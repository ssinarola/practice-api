const jwt = require("jsonwebtoken");

// verfiy token for private pages/apis
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      res
        .status(401)
        .json({ message: "Token is required for Authentication !" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(
      "decoded ===>",
      decoded,
      "============= req.user ===>",
      req.user
    );
    req.decodedUser = decoded;
    return next();
  } catch (err) {
    console.log("err verifyToken ========>", err);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
