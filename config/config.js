// server-side configuration-related variables
const config = {
  // differentiate between dev & production modes
  env: process.env.NODE_ENV || "development",

  //Defines the listening port for the server
  port: process.env.PORT || 3000,

  //The secret key for signing JWTs
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",

  // The location of the MongoDB database instance for the project
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/mongodb",
};

export default config;
