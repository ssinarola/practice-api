const { check } = require('express-validator')

const signinValidationRule = [
  check('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  check('password').exists().withMessage('Password is required')
]
const signupValidationRule = [
  check('fullName').exists().withMessage('FullName is required'),
  check('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  check('password').exists().withMessage('Password is required')
]
const productValidationRule = [
  check('name').exists().withMessage('Product name is Required !!')
]

module.exports = {
  signupValidationRule,
  signinValidationRule,
productValidationRule}

// module.exports = {
//   userAuthValidationRule,
//   signupValidationRule: [
//     check("fullName").exists().withMessage("FullName is required"),
//     ...userAuthValidationRule,
//   ],
// }
