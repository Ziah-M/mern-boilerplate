import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "./../../config/config";

// In addition to handling requests to signin / signout routes
// will provide JWT and express-jwt functionality
// to enable authentication & authorization
// for protected user API endpoints

const signin = async (req, res) => {
  try {
    let user = await user.findOne({ email: req.body.email });

    // User doesn't exist
    if (!user) return res.status("401").json({ error: "User not found" });

    // Email & Pass don't match
    // authenticate defined in UserSchema
    if (!user.authenticate(req.body.password)) {
      return res
        .status("401")
        .send({ error: "Email and password do not match" });
    }

    // Create a new JWT
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    // Set a cookie with the token
    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status("401").json({ error: "Could not sign in" });
  }
};

// optional endpoint
// not necessary for auth purposes if cookies are not used
// in the frontend
// On signout the client needs to delete the token on the client-side
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};

// uses express-jwt to verify that the incoming request
// has a valid JWT in the Authorization header
// valid -> appends the verified user's ID in an 'auth' key
// invalid -> throws an authentication error
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
});

// Checks whether the user is the same as the user
// being updated or delete
// before allowing the CRUD controller to proceed

/*
The req.auth object is populated by express-jwt in requireSignin 
after authentication verification, 
while req.profile is populated by the userByID function 
in user.controller.js. */

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }

  // Only allows the CRUD controller to proceed if authorized
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
