import express from "express";
import devBundle from "./devBundle";
import path from "path";
import template from "../template";
import { MongoClient } from 'mongodb'

const CURRENT_WORKING_DIR = process.cwd();
const mongoDBUrl = process.env.MONGODB_URI ||
  'mongodb://localhost:27017/mongodb'

const app = express();

// Serve static files from dist folder when the requested route starts with /dist
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// COMMENT THIS OUT FOR PRODUCTION
devBundle.compile(app);

// ROUTES
app.get("/", (req, res) => {
  res.status(200).send(template());
});

// Start server to listen for incoming requests
let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", port);
});


// Connect to MongoDB
MongoClient.connect(mongoDBUrl, (err, db)=>{
  console.log("Connected successfully to mongodb server")
 db.close()
})