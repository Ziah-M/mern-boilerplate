import config from "./../config/config";
import app from "./express";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

//configure mongoose to use native ES6 promises
mongoose.Promise = global.Promsie;

// Start server to listen for incoming requests
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

// Mongoose for implementing the user model
// Connect to MongoDB
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
