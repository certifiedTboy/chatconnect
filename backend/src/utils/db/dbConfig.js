// const mongoose = require("mongoose");
// const db = process.env.DB_URI;
// const dbconnection = mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("connectd to db"))
//   .catch((err) => console.log("error ", err));

// module.exports = dbconnection;

const mongoose = require("mongoose");

require("dotenv").config();

// Update below to match your own MongoDB connection string.
const MONGO_URL = process.env.DB_URL;

mongoose.connection.once("open", () => {
  console.log("db connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
};

const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
