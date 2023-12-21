const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { validationResult } = require("express-validator");
const signup = require("./authentication/signup");

const signupController = async (req, res, next) => {
  try {
    const data = await signup(req.body);
    res
      .status(201)
      .json({ data: data, message: "User registered Successfully !" });
  } catch (error) {
    console.log("error ===", error, error.message)
    next(createError(400, error.message));
  }
};

const signinController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // find user and pass if both match then create token and return token
    const user = await User.findOne({ email });
    if (!user) throw new createError(400, "User is not registered !");

    const isMatched = bcrypt.compareSync(password, user?.password);
    if (!isMatched) throw new createError(401, "Email/Password not matched");

    const jwtOptions = { expiresIn: "4h" };
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, jwtOptions);
    res.status(200).json({ data: { token }, message: "Logged in" });
  } catch (error) {
    next(createError(400, error.message));
  }
};
module.exports = { signupController, signinController };
