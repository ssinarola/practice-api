const jwt = require("jsonwebtoken");

// verfiy token for private pages/apis
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("token verifyToken =====================> ", token);

  if (!token) {
    res.json({ json: 401, message: "Token is required for Authentication !" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded ===>", decoded, "============= req.user ===>", req.user);
    req.decodedUser = decoded;
    return next();
  } catch (err) {
    console.log("err ========>", err);
    return res.json({ status: 401, message: "Invalid Token" });
  }
};

module.exports = verifyToken;
