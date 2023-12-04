const express = require("express");
const UserModal = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.post("/signup", async (req, res) => {
  console.log("req ==========>", req)
  // check db if user is available => find query
  const user = await UserModal.findOne({ email: req.body.email });

  if (user?.id) {
    // send msg that User is already register
    res.json({ status: 200, message: "User is already Registered !" });
  } else {
    // bcrypt PASSWORD
    let hasPassword;
    try {
      hasPassword = await bcrypt.hash(req.body.password.toString(), 10);
    } catch (err) {
      console.log("err.message", err.message);
    }
    console.log("hasPassword", hasPassword);

    // Add user - Create doc in user
    await UserModal.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hasPassword,
    });
    res.json({ status: 200, message: "User registered Successfully !" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  //validation - if balnk

  if (!email || !password) {
    res.status(400).send("Email or Password should not be blank");
  }
  // find user and check id and pass if both match then create token and return token
  const user = await UserModal.findOne({ email });
  console.log("user ========>", user);

  if (user && (await bcrypt.compare(password, user?.password))) {
    // token creation
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      // expiresIn: "1h",
      expiresIn: "4h",
    });
    console.log("token ===>", token);
    res.json({ status: 200, data: { message: "Logged in", token } });
  } else {
    res.json({ status: 400, message: "User is not registered !" });
  }
});

module.exports = router;
