import mongoose from "mongoose";
import crypto from 'crypto'

// Using mongoose to define the schema with the data fields
// Allows:
// -Built in validation
// -Business logic such as password encryption & authentication

// Takes a schema definition object
// Specifies the properties or structure of each document in a mongoDB collection
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
});

// password handled as a virtual field instead
// not stored directly in the user document
// when password value is received on user creation or update
// it is encrypted into a new hashed value
// and is set to the hashed_password field
// along with the unique salt value in the salt field
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => this._password);

UserSchema.methods = {
  // Called to verify sign-in attempts
  // by matching the user-provided password text
  // with the hashed_password stored in the database for a specific user
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) == this.hashed_password;
  },

  // Used to generate an encrypted hash from
  // the plain-text password
  // AND a unique salt value
  // uses  the crypto module from node
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      console.log('error in encryptPassword')
      return "";
    }
  },

  // generates a unique and random salt value using the
  // timestamp at execution and Math.random()
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

// CUSTOM VALIDATION

// check password value before Mongoose attempts to store hashed_password
UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters");
  }

  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

export default mongoose.model("User", UserSchema);
