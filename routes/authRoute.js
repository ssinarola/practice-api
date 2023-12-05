const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const router = express.Router();
router.post("/signup", async (req, res, next) => {
  try {
    // check db if user is available => find query
    const userFilter = { email: req.body.email };
    const user = await User.findOne(userFilter);

    if (user) next(createError(400, "User is already Registered"));

    // bcrypt PASSWORD
    const hasPassword = bcrypt.hashSync(req.body.password.toString(), 10);

    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hasPassword,
    });
    // here we can access _id, with create method we can access but it is awating for creation
    await newUser.save();

    res.status(201).json({ message: "User registered Successfully !" });
  } catch (error) {
    console.log(
      "error.message Signup =================>",
      error,
      "<<<<<<<<<<<<<-------------------->>>>>>>>>>>>",
      JSON.stringify(error)
    );
    next(createError(400, error.message));
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user and pass if both match then create token and return token
    const user = await User.findOne({ email });
    console.log("user ========>", user);

    if (user && (await bcrypt.compare(password, user?.password))) {
      // token creation
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        // expiresIn: "1h",
        expiresIn: "4h",
      });
      console.log("token ===>", token);
      res.status(200).json({ data: { message: "Logged in", token } });
    }
    res.status(400).json({ message: "User is not registered !" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
