import express from "express";
import devBundle from "./devBundle";
import path from "path";

import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'

// Express middleware modules
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

// Serve static files from dist folder when the requested route starts with /dist
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

// COMMENT THIS OUT FOR PRODUCTION
devBundle.compile(app);

// ROUTES
app.use('/', userRoutes)
app.use('/', authRoutes)

export default app;
