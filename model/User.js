const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'FullName is Required - Error from schema !']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is Required - Error from schema !']
    },
    password: {
      type: String,
      required: [true, 'Password is Required - Error from schema!']
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('users', UserSchema)
