import express from "express";
import devBundle from "./devBundle";
import path from "path";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

// Express middleware modules
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

const app = express();

// COMMENT THIS OUT FOR PRODUCTION
// Will import the middleware along with the client-side Webpack config
// Then initiates webpack to compile & bundle client-side code
// and enable hot-reloading
devBundle.compile(app);

// Serve static files from dist folder when the requested route starts with /dist
const CURRENT_WORKING_DIR = process.cwd();
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// --------------------- MIDDLEWARE MODULES -------------------

/*
Request body-parsing middleware to handle the complexities of 
parsing streamable request objects so that we can simplify 
browser-server communication by exchanging JSON in the request body. 
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie parsing middleware to parse and set cookies in request objects.
app.use(cookieParser());

// will attempt to compress response bodies for all requests that traverse through the middleware.
app.use(compress());

// Collection of middleware functions to help secure Express apps by setting various HTTP headers.
app.use(helmet());

// Middleware to enable cross-origin resource sharing (CORS).
app.use(cors());

// --------------------------------

// ROUTES
app.use("/", userRoutes);
app.use("/", authRoutes);

// Necessary error-catching code
// MUST BE AFTER ROUTES ARE MOUNTED
// Catches auth-related errors thrown by express-jwt
// express-jwt throws an UnauthorizedError when a token cannot be validated
// also catches other server-side errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
