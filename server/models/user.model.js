import mongoose from "mongoose";

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

export default mongoose.model("User", UserSchema);
