import config from "./../config/config";
import app from "./express";
import { MongoClient } from "mongodb";

// Start server to listen for incoming requests
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

// Connect to MongoDB
MongoClient.connect(mongoDBUrl, (err, db) => {
  console.log("Connected successfully to mongodb server");
  db.close();
});
