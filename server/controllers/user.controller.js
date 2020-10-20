import User from "../models/user.model";
import extend from "lodash/extend";
import errorHandler from "../helpers/dbErrorHandler";

const create = async (req, res) => {
  // create new user with the user JSON object received in POST request
  const user = new User(req.body);
  try {
    // attempts to save the user in the DB after Mongoose performs validation check
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created");
    res.json(users);
  } catch {
    return res.status(400).json({
      error: errorHandling.getErrorMessage(err),
    });
  }
};

// Required by read, update & delete
// Requires specific user to be loaded from the database
// Implementation will cause the Express router to do this action first
// Before responding to a specific request to read/update/delete

// Fetches & loads the user into the express request object
// Before propogating it to the next function
// Which is specific to the request that came in
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status("400").json({
        error: "User not found",
      });
    //   appends matching user to the request object
    req.profile = user;
    // next middleware propogates control to next relevant controller
    next();
  } catch {
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};

const read = (req, res) => {
  // Clean sensitive data from the returned user object
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);
};

const update = async (req, res, next) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();

    await user.save();
    // Clean sensitive data from the returned user object
    user.hashed_password = undefined;
    user.salt = undefined;

    res.json(user);
  } catch {
    return res.status(400).json({
      error: errorHandling.getErrorMessage(err),
    });
  }
};

const remove = async (req, res, next) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();

    // Clean sensitive data from the returned user object
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;

    res.json(deletedUser);
  } catch {
    return res.status(400).json({
      error: errorHandling.getErrorMessage(err),
    });
  }
};

export default { create, userByID, read, list, remove, update };
