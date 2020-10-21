import express from "express";
import path from "path";

// Express middleware modules
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import Template from "../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

// SERVER-SIDE RENDERING MODULES
// React modules required to use renderToString
import React from "react";
import ReactDOMServer from "react-dom/server";

// StaticRouter is a stateless router that takes the requested
// URL to match with the frontend route
// which was declared in the MainRouter component
// as MainRouter is the root component of our front-end
import MainRouter from "../client/MainRouter";
import { StaticRouter } from "react-router-dom";

// To generate CSS styles for the frontend components
// based on the stylings and Material-UI theme
// used on the frontend
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import theme from "../client/theme";
//              end

//comment out before building for production
import devBundle from "./devBundle";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// comment out before building for production
// Will import the middleware along with the client-side Webpack config
// Then initiates webpack to compile & bundle client-side code
// and enable hot-reloading
devBundle.compile(app);

// -----------   MIDDLEWARE    -----------------

// parse body params and attache them to req.body
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

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Serve static files from dist folder when the requested route starts with /dist
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// mount routes
app.use("/", userRoutes);
app.use("/", authRoutes);

// SERVER-SIDE-RENDERING
app.get("*", (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheets.toString();
  res.status(200).send(
    Template({
      markup: markup,
      css: css,
    })
  );
});

// Catch unauthorised errors
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
