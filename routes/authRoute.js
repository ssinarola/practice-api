const router = require("express").Router();
const { signupController, signinController } = require("../controller/auth");
const validationResultConstants = require("../utils/validationRules");
const validate = require("../middleware/validate");
const signup = require("../controller/authentication/signup");
const createError = require("http-errors");


router.post(
  "/signup",
  validate(validationResultConstants.signupValidationRule),
  async function _signup(req, res, next) {
    try {
      await signup(req.body);
      return res
      .status(201)
      .json({ message: "User registered Successfully !" });
    } catch (error) {
      next(createError(400, error.message));
    }
  }
);
router.post(
  "/signin",
  validate(validationResultConstants.signinValidationRule),
  signinController
);

module.exports = router;
