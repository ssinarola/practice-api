const User = require("../../model/User");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

async function signup(params) {
  const { fullName, email, password } = params;

  // check db if user is available => find query
  const userFilter = { email };
  const user = await User.findOne(userFilter);

  if (user) throw new createError(400, "User is already Registered");

  // bcrypt PASSWORD
  const hasPassword = bcrypt.hashSync(password.toString(), 10);
  const newUser = new User({
    fullName,
    email,
    password: hasPassword,
  });
  // here we can access _id, with create method we can access but it is awating for creation
  await newUser.save();
  return newUser;
}
module.exports = signup;
