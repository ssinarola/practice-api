const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: [true, "Email is Required !"] },
  password: { type: String, required: [true, "Password is Required !"] },
});

module.exports = mongoose.model("users", UserSchema);
